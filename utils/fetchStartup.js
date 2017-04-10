var Promise = require('promise');
var checkStartup = require('../utils/checkStartup.js');
var fetchTrends = require('../utils/fetchTrends.js');
var fetchWiki = require('../utils/fetchWiki.js');
var fetchLikes = require('../utils/fetchLikes.js');
var recordStartup = require('../utils/recordStartup.js');


module.exports = function (woeid) {
    return new Promise(function (resolve, reject) {
        checkStartup(woeid).then(function (doc) {
            if (doc.length) {
                resolve(JSON.parse(doc[0].result));
                throw new Error("Objective complete. Breaking promise chain");
            } else {
                return fetchTrends(woeid);
            }
        }).then(function (trends) {
            return fetchWiki(trends);
        }).then(function (wikiData) {
            //return only the most popular page generated from the search
            var topData = wikiData.map(function (trend) {
                return trend.sort(function (a, b) {
                    return b.pageviews - a.pageviews;
                })[0];
            });
            if (topData[0]) {
                recordStartup({
                    woeid: woeid,
                    result: topData
                });
            }
            return resolve(topData);
        }).catch(function (error) {
            reject(error);
        });
    });
}