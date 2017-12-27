const mongoose = require('mongoose');
const Climb = require('./climbs.js');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const climberSchema = mongoose.Schema({
        id: ObjectId,
        name: String,
        img: String,
        whatLoveREClimb14eenrs: String,
        description: String,
        climberLevel: String,
        faveClimbGear: String,
        fourteenerClimbAdvice: String,
        wannaClimbThese14eenrs: String,
        // climbs: [ {type : mongoose.Schema.ObjectId, ref : 'Climb'} ]
        climbs: [Climb.schema]
});

const Climber = mongoose.model('Climber', climberSchema);



module.exports = Climber;
