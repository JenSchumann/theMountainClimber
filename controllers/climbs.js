const express = require('express');
const router = express.Router();
const Climb = require('../models/climbs.js');
const Climber = require('../models/climbers.js');
const bcrypt = require('bcrypt');

router.get('/', (req, res)=>{
  if(req.session.logged){
        Climb.find({}, (err, foundClimbs)=>{
            res.render('climbs/index.ejs', {
                climbs: foundClimbs
              });
           })
    } else {
      res.redirect('/sessions/login')
    }

});

router.get('/new', (req, res)=>{
    Climber.find({}, (err, allClimbers)=>{
        res.render('climbs/new.ejs', {
            climbers: allClimbers
        });
    });
});

router.post('/', (req, res)=>{
    Climber.findById(req.body.climberId, (err, foundClimber)=>{
        Climb.create(req.body, (err, createdClimb)=>{
            foundClimber.climbs.push(createdClimb);
            foundClimber.save((err, data)=>{
                res.redirect('/climbs');
            });
        });
    });
});

router.get('/:id', (req, res)=>{
    Climb.findById(req.params.id, (err, foundClimb)=>{
        Climber.findOne({'climbs._id':req.params.id}, (err, foundClimber)=>{
            res.render('climbs/show.ejs', {
                climber:foundClimber,
                climb: foundClimb
            });
        })
    });
});

router.delete('/:id', (req, res)=>{
    Climb.findByIdAndRemove(req.params.id, (err, foundClimb)=>{
        Climber.findOne({'climbs._id':req.params.id}, (err, foundClimber)=>{
            foundClimber.climbs.id(req.params.id).remove();
            foundClimber.save((err, data)=>{
                res.redirect('/climbs');
            });
        });
    });
});

router.get('/:id/edit', (req, res)=>{
	Climb.findById(req.params.id, (err, foundClimb)=>{
		Climber.find({}, (err, allClimbers)=>{
			Climber.findOne({'climbs._id':req.params.id}, (err, foundClimbClimber)=>{
				res.render('climbs/edit.ejs', {
					climb: foundClimb,
					climbers: allClimbers,
					climbClimber: foundClimbClimber
				});
			});
		});
	});
});

router.put('/:id', (req, res)=>{
    Climb.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedClimb)=>{
        Climber.findOne({ 'climbs._id' : req.params.id }, (err, foundClimber)=>{
			if(foundClimber._id.toString() !== req.body.climberId){
				foundClimber.climbs.id(req.params.id).remove();
				foundClimber.save((err, savedFoundClimber)=>{
					Climber.findById(req.body.climberId, (err, newClimber)=>{
						newClimber.climbs.push(updatedClimb);
						newClimber.save((err, savedNewClimber)=>{
			                res.redirect('/climbs/'+req.params.id);
			            });
					});
	            });
			} else {
				foundClimber.climbs.id(req.params.id).remove();
	            foundClimber.climbs.push(updatedClimb);
	            foundClimber.save((err, data)=>{
	                res.redirect('/climbs/'+req.params.id);
	            });
			}
        });
    });
});

module.exports = router;
