const express = require('express');
const Climber = require('../models/climbers.js');
const router = express.Router();


//home page
router.get('/', (req, res)=>{
  //need to go back and add session
    Climber.find({}, (err,foundClimbers)=>{
      console.log('this climber', foundClimbers);
        res.render('climbers/index.ejs', {
            climbers: foundClimbers
        });
    })
});

//add new climber
router.get('/new', (req, res)=>{
      res.render('climbers/new.ejs');
});

//create route
router.post('/', (req, res)=>{
    Climber.create(req.body, (err, createdClimber)=>{
        res.redirect('/climbers');
    });
});















//avoid this handling /new by placing it towards bottom of the file
//post & SHOW route
router.get('/:id', (req, res)=>{
    Climber.findById(req.params.id, (err, foundClimber)=>{
        res.render('climbers/show.ejs', {
            climber: foundClimber
        });
    });
});























module.exports = router;
