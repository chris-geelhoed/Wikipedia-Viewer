var Promise = require('promise');
var Search = require('../models/Search.js');

module.exports = function() {
    return new Promise(function(resolve, reject) {
        Search.find().sort("-count").limit(10).select("result").exec(function(error, document) {
            if(error) {
                throw error;
            }
            /*resolve only the most popular page for each search */
            resolve(document.filter(function(doc) {
                return doc.result;
            }).map(function(doc) {
                return JSON.parse(doc.result).sort(function(a, b) {
                    return b.pageviews - a.pageviews;
                })[0];
            }));
        })
    });
}