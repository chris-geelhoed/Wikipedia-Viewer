var mongoose = require('mongoose');
var Login = require('../models/Login.js');

module.exports = function (ip, geo) {
    return new Promise(function (resolve, reject) {
        var query = { ip: ip },
            update = {
                ip: ip,
                date_string: new Date().toString(),
                date_now: Date.now(),
                country: geo.country,
                region: geo.region,
                city: geo.city,
                $inc: { visits: 1 },
            },
            options = { upsert: true, new: true };
        Login.findOneAndUpdate(query, update, options).exec().then(function (doc) {
            console.log("LOGIN SAVED");
            resolve(doc);
        });
    });
}