var Promise = require('promise');
var geocode = require('../utils/geocode.js');

var locations = [
    {
        address: "Canada",
        coords: {
            lat: 43.6532, 
            long: -79.3832,
        }
    },
    {
        address: "United States",
        coords: {
            lat: 34.0522, 
            long: -118.2437
        }
    },
    {
        address: "France",
        coords: {
            lat: 48.8566, 
            long: 2.3522,
        }
    },
    {
        address: "South Korea",
        coords: {
            lat: 37.5665, 
            long: 126.9780,
        }
    }
]


/*this test will iterate through the addresses listed above and confirm that country expected is included in the function output */

test('geocode includes the expected country in the address', () => {
  return Promise.all(locations.map(function(location) {
    return new Promise(function(resolve, reject) {
      geocode(location.coords.lat, location.coords.long).then(function(response) {
        console.log("found:", response);
        console.log("expected:", location.address);
        resolve(response.includes(location.address));
      });
    });
  })).then(function(data) {
    expect(data.every(function(test) {
      return test;
    })).toBeTruthy();
  });
});