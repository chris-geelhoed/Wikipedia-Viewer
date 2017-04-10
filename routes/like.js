var express = require('express');
var router = express.Router();
var Promise = require('promise');

var Like = require('../models/Like.js');

router.get('/', function (req, res, next) {
    var category = req.query.category;
    var title = req.query.title;
    var ip = req.clientIp; //ip set to random string for testing
    //var ip = String(Math.random());

    console.log("started");

    Like.find({
        title: title,
        ip: ip
    }).then(function (doc) {
        console.log("then...", doc, doc.length);
        return new Promise(function (resolve, reject) {
            console.log("and then...")
            if (doc.length) {
                console.log("doc.length", doc.length);
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
    }).then(function () {
        return new Promise(function (resolve, reject) {
            new Like({
                title: title,
                ip: ip
            }).save(function (error) {
                if (error) {
                    res.send({
                        error: error
                    });
                    throw error;
                }
                console.log("resolving after save");
                resolve();
            });
        });
    }).then(function () {
        Like.find({
            title: title
        }).then(function (doc) {
            console.log("final doc", doc);
            res.send({
                likes: doc.length
            });
        });
    });
});

module.exports = router;