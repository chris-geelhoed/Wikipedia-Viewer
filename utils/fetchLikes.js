var Promise = require('promise');
var Like = require('../models/Like.js');

module.exports = function (wikiData) {
    return new Promise(function (resolve, reject) {
        console.log("wikiData92", wikiData);
        if(!wikiData) {
            resolve(null);
        }
        Promise.all(wikiData.map(function (page) {
            return new Promise(function (resolve, reject) {
                Like.find({
                    title: page.title,
                    accept: true,
                }).exec().then(function(data) {
                    resolve(Object.assign({}, page, {likes: data.length}));
                });
            });
        })).then(function (data) {
            resolve(data);
        });
    });
}