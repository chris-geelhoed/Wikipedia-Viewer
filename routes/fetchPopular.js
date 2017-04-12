var express = require('express');
var router = express.Router();
var Promise = require('promise');
var fetchPopular = require('../utils/fetchPopular.js');
var fetchLikes = require('../utils/fetchLikes.js');
var sortBy = require('../utils/sortBy.js');

router.get('/', function(req, res, next) {
    fetchPopular().then(function(data) {
        //res.send(data);
        return fetchLikes(data);
    }).then(function(dataWithLikes) {
        res.send(sortBy(dataWithLikes, "pageviews"));
    });
});

module.exports = router;