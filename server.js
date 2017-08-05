const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const Climber = require('./models/climbers.js');

//middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(methodOverride('_method'));


const climbersController = require('./controllers/climbers.js');
app.use('/climbers', climbersController);

//to the homepage
app.get('/', (req, res)=>{
      Climber.find({}, (err, foundClimbers)=>{
      res.render('index.ejs', {
        climbers: foundClimbers
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
