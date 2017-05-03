var Promise = require('promise');
var geocoder = require("geocoder");

module.exports = function (lat, long) {
    return new Promise(function (resolve, reject) {
        geocoder.reverseGeocode(lat, long, function (error, data) {
            //iterate through the results of the reverse geocode until a type of country and region is found
            var address = {};
            var types = ["administrative_area_level_1", "country"];
            var shouldBreak = false;
            component = [];
            for(var i = 0, typesLen = types.length; i < typesLen; i++) {
                for(var j = 0, jLen = data.results.length; j < jLen; j++) {
                    shouldBreak = false;
                    for(var k = 0, kLen = data.results[j].address_components.length; k < kLen; k++) {
                        component = data.results[j].address_components[k];
                        if(component.types.indexOf(types[i]) !== -1) {
                            address[types[i]] = component.long_name;
                            shouldBreak = true;
                            break;
                        }
                    }
                    if(shouldBreak) {
                        break;
                    }
                }
            }
            var region = address["administrative_area_level_1"];
            var country = address["country"];
            if(region && country) {
                address = address["administrative_area_level_1"] + ", " + address["country"];
            } else {
                //If a region and country cannot be found
                address = "Unknown";
            }
            resolve(address);
        });
    });
}
