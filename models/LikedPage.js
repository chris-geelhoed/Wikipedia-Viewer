    var mongoose = require('mongoose');
    
    var likedPageSchema = mongoose.Schema({
		title: String,
        likes: Number,
        page: String, //this will be a stringified object with title, extract, pageviews, and img
    });

    module.exports = mongoose.model('LikedPage', likedPageSchema);