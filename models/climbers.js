const mongoose = require('mongoose');

const climberSchema = mongoose.Schema({
        name: String,
        img: String,
        description: String,
        fourteeners: String
});

const Climber = mongoose.model('Climber', climberSchema);



module.exports = Climber;
