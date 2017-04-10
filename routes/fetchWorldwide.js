var express = require('express');
var router = express.Router();
var Promise = require('promise');
var fetchStartup = require('../utils/fetchStartup.js');
var fetchLikes = require('../utils/fetchLikes.js');


router.get('/', function(req, res, next) {
    fetchStartup("1").then(function(topData) {
        return fetchLikes(topData);
    }).then(function(topDataWithLikes) {
        res.send(topDataWithLikes);
    });
});

module.exports = router;