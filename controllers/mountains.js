const express = require('express');
const Mountain = require('../models/mountains.js');
const router = express.Router();


//from home page to mountains index of summits posted
router.post('/', (req, res)=>{
      Mountain.create(req.body, (err, createdMountain)=>{
          res.redirect('/mountains');
        });
});

router.get('/index', (req, res)=>{
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
      res.render('mountains/new.ejs');
});































module.exports = router;
