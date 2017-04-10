var express = require('express');
var router = express.Router();
var Promise = require('promise');
var geoip = require('geoip-gh');
var fetchWOEID = require('../utils/fetchWOEID.js');
var fetchStartup = require('../utils/fetchStartup.js');
var fetchPopular = require('../utils/fetchPopular.js');
var fetchLikes = require('../utils/fetchLikes.js');


router.get('/', function (req, res, next) {
    //get ip => geolocation => yahoo woeid (needed for twitter trends) => twitter trends => wikipedia articles
    //if ip lookup fails then default to Vancouver sample ip
    var ip = /[\d]+.{1}[\d]+.{1}[\d]+.{1}[\d]+/.exec(req.clientIp) || "96.53.57.70";
    new Promise(function (_resolve, _reject) {
        geoip.lookup(ip, function (geo) {
            _resolve(geo);
        });
    }).then(function (geo) {
        return fetchWOEID({
            lat: geo.ll[0],
            long: geo.ll[1]
        });
    }).then(function (location) {
        return fetchStartup(location.woeid);
    }).then(function (topData) {
        console.log("got topdata at startup");
        return fetchLikes(topData);
    }).then(function(topDataWithLikes) {
        res.send(topDataWithLikes);
    })
});

module.exports = router;