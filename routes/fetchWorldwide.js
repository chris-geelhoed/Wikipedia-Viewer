var express = require('express');
var router = express.Router();
var Promise = require('promise');
var fetchStartup = require('../utils/fetchStartup.js');
var fetchLikes = require('../utils/fetchLikes.js');
var sortBy = require('../utils/sortBy.js');


router.get('/', function(req, res, next) {
    fetchStartup("1").then(function(topData) {
        return fetchLikes(topData);
    }).then(function(topDataWithLikes) {
        res.send(sortBy(topDataWithLikes, "pageviews"));
    });
});

module.exports = router;