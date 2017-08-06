const mongoose = require('mongoose');

const mountainSchema = mongoose.Schema({
        fourteeners: String,
        peakPerks: String,
        date: String,
        img: String
});

const Mountain = mongoose.model('Mountain', mountainSchema);



module.exports = Mountain;
