var Promise = require('promise');
var mongoose = require('mongoose');
var Startup = require('../models/Startup.js');

module.exports = function (woeid) {
    return new Promise(function (resolve, reject) {
        console.log("checkStartup called");
        var earliestDateNow = Date.now() - 1 * 60 * 60 * 1000; //for 1 hour expiration;
        //var earliestDateNow = Date.now() - 30 * 1000; //for 30s expiration for testing
        Startup.find({
            woeid: woeid
        }).where("date_now")
            .gt(earliestDateNow)
            .sort("-date_now")
            .limit(1)
            .exec().then(function (doc) {
                resolve(doc);
            });
    });
}