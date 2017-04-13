    var mongoose = require('mongoose');
    
    var loginSchema = mongoose.Schema({
    	ip: String, //this will be a stringified JSON
    	date_string: String,
    	date_now: Number,
		country: String,
		region: String,
		city: String,
		visits: {
			type: Number,
			default: 1,
		}
    });

    module.exports = mongoose.model('Login', loginSchema);