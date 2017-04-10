var Promise = require('promise');
var fetchWOEID = require('../utils/fetchWOEID.js');

var cities =
  [
    {
      name: "Vancouver",
      coords: {
        lat: 49.2827,
        long: -123.1207
      },
      woeid: "9807"
    },
    {
      name: "Montreal",
      coords: {
        lat: 45.5017,
        long: -73.5673
      },
      woeid: "3534"
    },
    {
      name: "Berlin",
      coords: {
        lat: 52.5200,
        long: 13.4050
      },
      woeid: "638242"
    },
    {
      name: "Tokyo",
      coords: {
        lat: 35.6895,
        long: 139.6917
      },
      woeid: "1118370"
    }
  ]

/*this test will iterate through the cities listed above and confirm that fetchWOEID returns the code expected */

test('fetchWOEID returns correct WOEID given latitude and longitude', () => {
  return Promise.all(cities.map(function(city) {
    return new Promise(function(resolve, reject) {
      fetchWOEID(city.coords).then(function(response) {
        console.log("found:", response.woeid);
        console.log("expected:", city.woeid);
        resolve(response.woeid == city.woeid);
      });
    });
  })).then(function(data) {
    expect(data.every(function(test) {
      return test;
    })).toBeTruthy();
  });
});