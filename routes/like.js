var express = require('express');
var router = express.Router();
var Promise = require('promise');

var Like = require('../models/Like.js');
var LikedPage = require('../models/LikedPage.js');

router.get('/', function (req, res, next) {
    var page = req.query.page;
    var title = req.query.title;
    console.log("PAGE", page);
    //var ip = req.clientIp; //ip set to random string for testing
    var ip = String(Math.random());
    Like.find({
        title: title,
        ip: ip
    }).exec().then(function (doc) {
        console.log("then...", doc, doc.length);
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
                    console.log("resolve()");
                    resolve();
                }
            });
        });
    }).then(function () {
        return new Promise(function (resolve, reject) {
            LikedPage.findOne({
                title: title,                
            }, function(error, doc) {
               if(error) { throw error; }
               else if(doc) {
                   var likes = doc.likes + 1;
                   var newPage = JSON.parse(doc.page);
                   newPage.likes = likes;
                   doc.likes = likes;
                   doc.page = JSON.stringify(newPage);
                   doc.save(function(error) {
                       resolve();
                   });
               } else {
                   new LikedPage({
                       title: title,
                       likes: 1,
                       page: page,
                   }).save(function(error) {
                       resolve();
                   });
               }
            });
        });
    }).then(function () {
        Like.find({
            title: title,
            accepted: true,
        }).then(function (doc) {
            console.log("final doc", doc);
            res.send({
                likes: doc.length
            });
        });
    });
});

module.exports = router;