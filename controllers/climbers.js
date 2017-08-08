const express = require('express');
const router = express.Router();
const Climb = require('../models/climbs.js');
const Climber = require('../models/climbers.js')
const bcrypt = require('bcrypt');

router.get('/', (req, res)=>{
  console.log(req.session, ' auth route')
  if(req.session.logged){
  Climber.find({}, (err, foundClimbers)=>{
		res.render('climbers/index.ejs', {
			climbers: foundClimbers
		});
	});
  } else {
    res.redirect('/sessions/login')
  }
});

router.get('/new', (req, res)=>{
  Climb.find({}, (err, allClimbs)=>{
        res.render('climbers/new.ejs', {
            climbs: allClimbs
        });
    });
});

router.post('/', (req, res)=>{
    // res.send(req.body);
      Climber.create(req.body, (err, createdClimber)=>{
        res.redirect('/climbers');
      });
});

router.get('/:id', (req, res)=>{
	Climber.findById(req.params.id, (err, foundClimber)=>{
    // res.send(foundClimber);
    Climb.findOne({'climbers._id':req.params.id}, (err, foundClimb)=>{
		res.render('climbers/show.ejs', {
          climb: foundClimb,
          climber: foundClimber
        });
		});
	});
});

router.delete('/:id', (req, res)=>{
	Climber.findByIdAndRemove(req.params.id, (err, foundClimber)=>{
    const climbIds = [];
    for (let i = 0; i < foundClimber.climbs.length; i++) {
      climbIds.push(foundClimber.climbs[i]._id);
    }
		Climb.remove(
      {
        _id : {
          $in: climbIds
        }
      },
      (err, data)=>{
        res.redirect('/climbs');
      }
    );
  });
});


router.get('/:id/edit', (req, res)=>{
  // console.log('=============================');
	Climber.findById(req.params.id, (err, foundClimber)=>{
    // res.send(foundClimber);
//problem here .... edit.ejs before show.ejs:
		      res.render('climbers/edit.ejs', {
			         climber: foundClimber
		           });
            });
        });



router.put('/:id', (req, res)=>{
	Climber.findByIdAndUpdate(req.params.id, req.body, ()=>{
		res.redirect('/climbers');
	});
});

module.exports = router;
