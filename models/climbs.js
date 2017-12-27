const mongoose = require('mongoose');
const Climber = require('./climbers.js');



const climbSchema = mongoose.Schema({
        fourteeners: String,
        img: String,
        about: String,
        summitTip: String,
        date: String
});

const Climb = mongoose.model('Climb', climbSchema);



module.exports = Climb;
