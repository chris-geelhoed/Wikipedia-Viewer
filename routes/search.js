var express = require('express');
var router = express.Router();
var Promise = require('promise');
var geoip = require('geoip-gh');
var fetchSearch = require('../utils/fetchSearch.js');
var fetchLikes = require('../utils/fetchLikes.js');

var Request = require('../models/Request.js');

router.get('/', function (req, res, next) {
    var query = req.query.query;
    var ip = req.clientIp;
    //ip required to look up user location
    geoip.lookup(ip, function (geo) {
        new Request({
            ip: ip,
            geo: JSON.stringify(geo),
            date_string: new Date().toString(),
            date_now: Date.now(),
            query: query
        }).save(function (error) {
            if (error) {
                throw error;
            }
        });
    });

    fetchSearch(query).then(function (wikiData) {
        console.log("wikiData99", wikiData);
        return fetchLikes(wikiData);
    }).then(function (wikiDataWithLikes) {
        console.log("wikiDataWithLikes", wikiDataWithLikes);
        res.send({
            userSearch: wikiDataWithLikes
        });
    });
});

module.exports = router;