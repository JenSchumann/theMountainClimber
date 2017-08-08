const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const Climber = require('./models/climbers.js');
const Climb = require('./models/climbs.js');


//middleware
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));
const session = require('express-session');

app.use(session({
  secret: "polynesion rugs are the best to have in your home",
  resave: false,
  saveUninitialized: false
}));

//to use the controllers for the 2 models
const climbersController = require('./controllers/climbers.js');
app.use('/climbers', climbersController);

const climbsController = require('./controllers/climbs.js');
app.use('/climbs', climbsController);

const sessionsController = require('./controllers/session.js');
app.use('/sessions', sessionsController);


app.get('/', (req, res)=>{
    res.render('index.ejs');
});

























const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/tall_Mountains'
mongoose.connect(mongoUri);

mongoose.connection.once('open', ()=>{
          console.log('mountain climber connected to mongo');
});



const port = process.env.PORT || 3000;



app.listen(port, ()=>{
  console.log('hiker is listening');
  console.log('---------------------------------');
  console.log('Server running on port: ' + port);
  console.log('---------------------------------');
});
