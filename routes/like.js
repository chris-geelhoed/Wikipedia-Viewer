var express = require('express');
var router = express.Router();
var Promise = require('promise');
var objectAssign = require('object-assign');

var Like = require('../models/Like.js');
var LikedPage = require('../models/LikedPage.js');

router.get('/', function (req, res, next) {
    var page = JSON.parse(req.query.page);
    var title = page.title;
    //var ip = req.clientIp; //ip set to random string for testing
    var ip = String(Math.random());
    Like.find({
        title: title,
        ip: ip
    }).exec().then(function (doc) {
        return new Promise(function (resolve, reject) {
            accepted = doc.length === 0 ? true : false;
            new Like({
                title: title,
                ip: ip,
                accepted: accepted,
            }).save(function (error) {
                if (error) { throw error; }
                else if (!accepted) {
                    res.send({
                        message: "user has already liked that article"
                    });
                    throw new Error();
                }
                else {
                    resolve();
                }
            });
        });
    }).then(function () {
        return new Promise(function (resolve, reject) {
            var query = {title: title},
                update = {
                    thumbnail: page.thumbnail,
                    title: title,
                    $inc: {likes: 1},
                    pageviews: page.pageviews,
                    extract: page.extract,
                },
                options = { upsert: true, new: true };
            LikedPage.findOneAndUpdate(query, update, options).exec().then(function(doc) {
                res.send({likes: doc.likes});
            });
        });
    });
});

module.exports = router;