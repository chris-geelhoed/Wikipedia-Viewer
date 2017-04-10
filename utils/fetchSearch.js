var Promise = require('promise');
var values = require('object.values');
var Search = require('../models/Search.js');
var checkAndUpdateSearch = require('../utils/checkAndUpdateSearch.js');
var fetchWiki = require('../utils/fetchWiki.js');
var recordSearch = require('../utils/recordSearch.js');


module.exports = function(query) {
    return new Promise(function(resolve, reject) {
        checkAndUpdateSearch(query).then(function(doc) {
            if (doc) {
                console.log("doc", doc);
                resolve(JSON.parse(doc.result));
                throw new Error("Objective complete. Breaking promise chain"); //thowing this error breaks the promise chain
            } else {
                return fetchWiki([query]);
            }
        }).then(function(wikiData) {
            console.log("wikiData 33", wikiData);
            if (wikiData && wikiData[0]) {
                recordSearch({
                    query: query,
                    result: JSON.stringify(wikiData[0]),
                    count: 1
                });
            }
            return new Promise(function(resolve, reject) {
                resolve(wikiData[0]);
            });
        }).then(function(wikiData) {
            console.log("wikiData 66", wikiData);
            resolve(wikiData);
        }).catch(function(error) {
            reject(error);
        });
    });
}