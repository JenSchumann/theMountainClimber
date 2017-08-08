const mongoose = require('mongoose');
const Climber = require('./climbers.js');


const climbSchema = mongoose.Schema({
        fourteeners: String,
        about: String,
        date: String,
        img: String
});

const Climb = mongoose.model('Climb', climbSchema);



module.exports = Climb;
