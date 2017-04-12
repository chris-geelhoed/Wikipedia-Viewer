var Promise = require('promise');
var LikedPage = require('../models/LikedPage.js');

module.exports = function () {
    return new Promise(function (resolve, reject) {
        LikedPage.find().sort("-likes").limit(10).exec().then(function(document) {
            var result = document.map(function(doc) {
                return {
                    thumbnail: doc.thumbnail,
                    title: doc.title,
                    pageviews: doc.pageviews,
                    likes: doc.likes,
                    extract: doc.extract,
                }
            });
            resolve(result);
        });
    });
}