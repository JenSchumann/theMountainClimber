const mongoose = require('mongoose');
const Climb = require('./climbs.js');

const climberSchema = mongoose.Schema({
        name: String,
        img: String,
        description: String,
        climbs: [Climb.schema]
});

const Climber = mongoose.model('Climber', climberSchema);



module.exports = Climber;
