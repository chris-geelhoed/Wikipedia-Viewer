    var mongoose = require('mongoose');
    
    var likeSchema = mongoose.Schema({
		title: String,
		ip: String
    });

    module.exports = mongoose.model('Like', likeSchema);