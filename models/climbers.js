const mongoose = require('mongoose');
const Mountain = require('./mountains.js');

const climberSchema = mongoose.Schema({
        name: String,
        img: String,
        description: String,
        mountains: [Mountain.schema]
});

const Climber = mongoose.model('Climber', climberSchema);



module.exports = Climber;
