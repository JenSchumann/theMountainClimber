const mongoose = require('mongoose');
const Climber = require('./climbers.js');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;


const climbSchema = mongoose.Schema({
        id: ObjectId,
        fourteeners: String,
        img: String,
        about: String,
        summitTip: String,
        date: String,
        summitRating: Number,
        climbers: [ {type : mongoose.Schema.ObjectId, ref : 'Climber'} ]
        // climbers: [Climber.schema]
});

const Climb = mongoose.model('Climb', climbSchema);



module.exports = Climb;
