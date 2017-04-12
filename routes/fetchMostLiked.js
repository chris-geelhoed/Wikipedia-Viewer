var express = require('express');
var router = express.Router();
var Promise = require('promise');
var fetchMostLiked = require('../utils/fetchMostLiked.js');

router.get('/', function (req, res, next) {
    fetchMostLiked().then(function(mostLiked) {
        res.send(mostLiked);
    });
});

module.exports = router;