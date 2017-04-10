var mongoose = require('mongoose');
var Startup = require('../models/Startup.js');

module.exports = function(startup) {
    var Entry = new Startup({
        woeid: startup.woeid,
        date_string: new Date().toString(),
        date_now: Date.now(),
        result: JSON.stringify(startup.result)
    });
    Entry.save(function(error) {
        if (error) {
            throw error;
        }
    });
}