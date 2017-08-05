const express = require('express');
const app = express();
const mongoose = require('mongoose');



const climbersController = require('./controllers/climbers.js');
app.use('/climbers', climbersController);

//to the homepage
app.get('/', (req, res)=>{
      res.render('index.ejs');
});






























mongoose.connect('mongodb://localhost:27017/tall_Mountains');

mongoose.connection.once('open', ()=>{
          console.log('mountain climber connected to mongo');
});







app.listen(3000, ()=>{
  console.log('hiker is listening');
});
