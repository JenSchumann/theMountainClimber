const express = require('express');
const router = express.Router();
const Mountain = require('../models/mountains.js');
const Climber = require('../models/climbers.js');



//from home page to mountains index of summits posted


router.get('/', (req, res)=>{
  // res.send('hello hiker');
  //need to go back and add session
    Mountain.find({}, (err,foundMountains)=>{
      console.log('this mountain', foundMountains);

        res.render('mountains/index.ejs', {
            mountains: foundMountains
        });
    })
});

//to create a new summit post
router.get('/new', (req, res)=>{
  Climber.find({}, (err, allClimbers)=>{
      res.render('mountains/new.ejs', {
          climbers: allClimbers
      });
    });
});

//to gather new mountain climbed by climber info
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

//to SHOW new mountain climbed by climber info
router.get('/:id', (req, res)=>{
    Mountain.findById(req.params.id, (err, foundMountain)=>{
      Climber.findOne({'mountains._id':req.params.id}, (err, foundClimber)=>{
          res.render('mountains/show.ejs', {
            climber: foundClimber,
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
    Mountain.findByIdAndUpdate(req.params.id, req.body, (err, updatedMountain)=>{
        Climber.findOne({ 'mountains._id' : req.params.id }, (err, foundClimber)=>{
				foundClimber.mountains.id(req.params.id).remove();
				foundClimber.save((err, savedFoundClimber)=>{
					Climber.findById(req.body.climberId, (err, newClimber)=>{
						newClimber.mountains.push(updatedMountain);
						newClimber.save((err, savedNewClimber)=>{
			                res.redirect('/mountains/'+req.params.id);
			            });
					});
	            });

			});
        });
    });











































module.exports = router;
