    var mongoose = require('mongoose');
    
    var likedPageSchema = mongoose.Schema({
        thumbnail: String,
		title: String,
        likes: {
            type: Number,
            default: 0,
        },
        pageviews: Number,
        extract: String,
    });

    module.exports = mongoose.model('LikedPage', likedPageSchema);