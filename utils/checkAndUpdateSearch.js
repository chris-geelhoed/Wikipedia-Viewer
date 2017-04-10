var Promise = require('promise');
var mongoose = require('mongoose');
var Search = require('../models/Search.js');

module.exports = function(query) {
    return new Promise(function(resolve, reject) {
        console.log("checkAndUpdateSearch called");
        Search.findOneAndUpdate({
            query: query
        }, {
            $inc: {
                count: 1
            }
        }).exec(function(error, doc) {
            if (error) {
                console.log("error", error);
                throw error;
                reject(error);
            } else {
                resolve(doc);
            }
        })
    });
}