var express = require('express');
var router = express.Router();
var Promise = require('promise');
var geoip = require('geoip-gh');
var geocode = require('../utils/geocode.js');

router.get('/', function (req, res, next) {
    //get the user's coordinates, city, and country

    var ipLookup = /[\d]+.{1}[\d]+.{1}[\d]+.{1}[\d]+/.exec(req.clientIp);
    var ip = ipLookup ? ipLookup[0] : "96.53.57.70"; //assume Burnaby if cannot get ip
    var lat, long;
    new Promise(function (_resolve, _reject) {
        geoip.lookup(ip, function (geo) {
            _resolve(geo);
        });
    }).then(function (geo) {
        lat = geo.ll[0];
        long = geo.ll[1];
        return geocode(lat, long);
    }).then(function(address) {
        res.send({
            address: address,
            coords: {
                lat: lat,
                long: long,
            }
        })
    })
});

module.exports = router;