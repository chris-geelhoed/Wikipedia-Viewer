var Promise = require('promise');
var client = require('../twitterclient.js');

module.exports = function (coords) {
    return new Promise(function (resolve, reject) {
        client.get('trends/closest', { lat: coords.lat, long: coords.long }, function (error, location, response) {
            if (!error) {
                resolve(location[0]);
            } else {
                reject(error);
            }
        });
    });
}