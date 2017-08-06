const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const Climber = require('./models/climbers.js');
const Mountain = require('./models/mountains.js');

//middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(methodOverride('_method'));

//to use the controllers for the 2 models
const climbersController = require('./controllers/climbers.js');
app.use('/climbers', climbersController);

const mountainsController = require('./controllers/mountains.js');
app.use('/mountains', mountainsController);


//climber route to the homepage
app.get('/', (req, res)=>{
      Climber.find({}, (err, foundClimbers)=>{
      res.render('index.ejs', {
        climbers: foundClimbers
        });
    });
});


//mountains route to the homepage
app.get('/', (req, res)=>{
      Mountain.find({}, (err, foundMountains)=>{
      res.render('index.ejs', {
        mountains: foundMountains
        });
    });
});



























mongoose.connect('mongodb://localhost:27017/tall_Mountains');

mongoose.connection.once('open', ()=>{
          console.log('mountain climber connected to mongo');
});







app.listen(3000, ()=>{
  console.log('hiker is listening');
});
