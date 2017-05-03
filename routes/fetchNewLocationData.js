var express = require('express');
var router = express.Router();
var Promise = require('promise');
var fetchWOEID = require('../utils/fetchWOEID.js');
var fetchStartup = require('../utils/fetchStartup.js');
var fetchLikes = require('../utils/fetchLikes.js');
var sortBy = require('../utils/sortBy.js');
var geocode = require('../utils/geocode');

var geocoder = require('geocoder');


router.get('/', function (req, res, next) {
    //similar to fetchNearYou but no need to record login or look up coordinates
    var lat = req.query.lat;
    var long = req.query.long;
    var nearYou = [];
    fetchWOEID({
        lat: lat,
        long: long,
    }).then(function (location) {
        return fetchStartup(location.woeid);
    }).then(function (topData) {
        console.log("got topdata at startup (fetchNewLocationData)");
        return fetchLikes(topData);
    }).then(function (topDataWithLikes) {
        nearYou = sortBy(topDataWithLikes, "pageviews");
        return geocode(lat, long);
    }).then(function (address) {
        res.send({
            nearYou: nearYou,
            address: address,
        });
    })
});

module.exports = router;