const express = require('express');
const router = express.Router();
const Climb = require('../models/climbs.js');
const Climber = require('../models/climbers.js');
const bcrypt = require('bcrypt');

router.get('/', (req, res)=>{
    Climb.find({}, (err, foundClimbs)=>{
            res.render('./climbs/index.ejs', {
                climbs: foundClimbs
              });
        });
});
//2nd model should render to 1st model show page & 2nd model
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


router.get('/new', (req, res)=>{
    Climber.find({}, (err, allClimbers)=>{
        res.render('climbs/new.ejs', {
            climbers: allClimbers
        });
    });
});


//climb show page

router.get('/:id', (req, res)=>{
  Climb.findById(req.params.id, (err, foundClimb) =>{
    console.log(foundClimb);
    res.render('climbs/show.ejs', {
      climb: foundClimb
    });
  });
});


module.exports = router;
