    var mongoose = require('mongoose');

    var startupSchema = mongoose.Schema({
        woeid: String,
        date_string: String,
        date_now: Number,
        result: String //this will be a stringified JSON object
    });

    module.exports = mongoose.model('Startup', startupSchema);
