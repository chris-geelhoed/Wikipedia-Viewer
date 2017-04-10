    var mongoose = require('mongoose');
    
    var requestSchema = mongoose.Schema({
    	ip: String,
    	geo: String, //this will be a stringified JSON
    	date_string: String,
    	date_now: Number,
    	query: String
    });

    module.exports = mongoose.model('Request', requestSchema);