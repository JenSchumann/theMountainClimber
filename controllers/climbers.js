const express = require('express');
const router = express.Router();
const Climb = require('../models/climbs.js');
const Climber = require('../models/climbers.js')
const bcrypt = require('bcrypt');

router.get('/', (req, res)=>{
  console.log(req.session, ' this is req.session in auth route')
	Climber.find({}, (err, foundClimbers)=>{
		res.render('climbers/index.ejs', {
			climbers: foundClimbers
		});
	})
});

router.post('/', (req, res)=>{
    // res.send(req.body);
    req.body.climbId);
      Climb.findById(req.body.climbId, (err, foundClimb)=>{
        console.log(foundClimb);
	         Climber.create(req.body, (err, createdClimber)=>{
              foundClimb.climbs.push(createdClimb);
              foundClimb.save((err,data)=>{
		              res.redirect('/climbers');
                });
          });
	   });
});

router.get('/new', (req, res)=>{
  Climb.find({}, (err, allClimbs)=>{
        res.render('climbers/new.ejs', {
            climbs: allClimbs
        });
    });
});

router.get('/:id', (req, res)=>{
	Climber.findById(req.params.id, (err, foundClimber)=>{
    Climb.findOne({'climbs._id':req.params.id}, (err, foundClimb)=>{
		res.render('climbers/show.ejs', {
          climb: foundClimb,
          climber: foundClimber
        }):
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
				res.redirect('/climbers');
			}
		);
	});
});

router.get('/:id/edit', (req, res)=>{
  console.log('=============================');
	Climber.findById(req.params.id, (err, foundClimber)=>{
    Climb.find({} (err, allClimbs)=>{
      Climb.findOne({'climbs._id':req.params.id}, (err, foundClimberClimb=>{
		      res.render('climbers/edit.ejs', {
			         climber: foundClimber,
               climb: allClimbs,
               climberClimb: foundClimberClimb
		           });
            });
        });
	   });
});


router.put('/:id', (req, res)=>{
	Climber.findByIdAndUpdate(req.params.id, req.body, ()=>{
		res.redirect('/climbers');
	});
});

module.exports = router;
