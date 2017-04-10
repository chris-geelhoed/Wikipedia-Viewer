var Promise = require('promise');
var client = require('../twitterclient.js');

module.exports = function (woeid) {
    return new Promise(function (resolve, reject) {
        //the id = 9807 is the yahoo code for Vancouver area, id = 1 is the world
        client.get('trends/place', { 'screen_name': 'nodejs', 'id': woeid }, function (error, tweets, response) {
            if (!error) {
                resolve(
                    tweets[0].trends.map(function (trend) {
                        return trend.name.replace("#", "");
                    })
                );
            } else {
                reject(error);
            }
        });
    });
}