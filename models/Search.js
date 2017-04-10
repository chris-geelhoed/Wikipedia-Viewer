    var mongoose = require('mongoose');
    
    var searchSchema = mongoose.Schema({
        query: String,
        result: String, //this is a stringified JSON
        count: Number
    });

    module.exports = mongoose.model('Search', searchSchema);