const mongoose = require('mongoose');
const Climb = require('./climbs.js');

const climberSchema = mongoose.Schema({
        name: String,
        img: String,
        whatLoveREClimb14eenrs: String,
        description: String,
        climberLevel: String,
        faveClimbGear: String,
        fourteenerClimbAdvice: String,
        wannaClimbThese14eenrs: String,
        climbs: [Climb.schema]
});

const Climber = mongoose.model('Climber', climberSchema);



module.exports = Climber;
