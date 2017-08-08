const express = require('express');
const router = express.Router();
const Mountain = require('../models/mountains.js');
const Climber = require('../models/climbers.js');
const bcrypt = require('bcrypt');

router.get('/', (req, res)=>{
  if(req.session.logged){
        Mountain.find({}, (err, foundMountains)=>{
            res.render('mountains/index.ejs', {
                mountains: foundMountains
              });
           })
    } else {
      res.redirect('/sessions/login')
    }

});

router.get('/new', (req, res)=>{
    Climber.find({}, (err, allClimbers)=>{
        res.render('mountains/new.ejs', {
            climbers: allClimbers
        });
    });
});

router.post('/', (req, res)=>{
    Climber.findById(req.body.climberId, (err, foundClimber)=>{
        Mountain.create(req.body, (err, createdMountain)=>{
            foundClimber.mountains.push(createdMountain);
            foundClimber.save((err, data)=>{
                res.redirect('/mountains');
            });
        });
    });
});

router.get('/:id', (req, res)=>{
    Mountain.findById(req.params.id, (err, foundMountain)=>{
        Climber.findOne({'mountains._id':req.params.id}, (err, foundClimber)=>{
            res.render('mountains/show.ejs', {
                climber:foundClimber,
                mountain: foundMountain
            });
        })
    });
});

router.delete('/:id', (req, res)=>{
    Mountain.findByIdAndRemove(req.params.id, (err, foundMountain)=>{
        Climber.findOne({'mountains._id':req.params.id}, (err, foundClimber)=>{
            foundClimber.mountains.id(req.params.id).remove();
            foundClimber.save((err, data)=>{
                res.redirect('/mountains');
            });
        });
    });
});

router.get('/:id/edit', (req, res)=>{
	Mountain.findById(req.params.id, (err, foundMountain)=>{
		Climber.find({}, (err, allClimbers)=>{
			Climber.findOne({'mountains._id':req.params.id}, (err, foundMountainClimber)=>{
				res.render('mountains/edit.ejs', {
					mountain: foundMountain,
					climbers: allClimbers,
					mountainClimber: foundMountainClimber
				});
			});
		});
	});
});

router.put('/:id', (req, res)=>{
    Mountain.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedMountain)=>{
        Climber.findOne({ 'mountains._id' : req.params.id }, (err, foundClimber)=>{
			if(foundClimber._id.toString() !== req.body.climberId){
				foundClimber.mountains.id(req.params.id).remove();
				foundClimber.save((err, savedFoundClimber)=>{
					Climber.findById(req.body.climberId, (err, newClimber)=>{
						newClimber.mountains.push(updatedMountain);
						newClimber.save((err, savedNewClimber)=>{
			                res.redirect('/mountains/'+req.params.id);
			            });
					});
	            });
			} else {
				foundClimber.mountains.id(req.params.id).remove();
	            foundClimber.mountains.push(updatedMountain);
	            foundClimber.save((err, data)=>{
	                res.redirect('/mountains/'+req.params.id);
	            });
			}
        });
    });
});

module.exports = router;
