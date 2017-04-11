var Promise = require('promise');
var Like = require('../models/Like.js');
var fetchWiki = require('./fetchWiki.js');

module.exports = function () {
    return new Promise(function (resolve, reject) {
        Like.find({
            accepted: true
        }).exec(function (error, document) {
            if (error) {
                throw error;
            }
            var likes = document.reduce(function (acc, doc) {
                if (doc.title) {
                    if (acc[doc.title]) {
                        acc[doc.title] += 1;
                    } else {
                        acc[doc.title] = 1;
                    }
                }
                return acc;
            }, {});
            fetchWiki(Object.keys(likes)).then(function (wikiData) {
                var mostLiked = wikiData.map(function (results) {
                    var result = results.filter(function (result) {
                        return Object.keys(likes).indexOf(result.title) !== -1;
                    })[0];
                    result["likes"] = likes[result.title];
                    return result;
                }).slice(0, 10);
                resolve(mostLiked);
            })
        });
    });
}