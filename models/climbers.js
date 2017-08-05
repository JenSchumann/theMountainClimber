const mongoose = require('mongoose');

const climberSchema = mongoose.Schema({
        name: String,
        img: String,
        description: String
});

const Climber = mongoose.model('Climber', authorSchema);



module.exports = Climber;
