var Promise = require('promise');
var checkStartup = require('../utils/checkStartup.js');
var mongoose = require('mongoose');
var mongopath = require('../mongopath.js');
mongoose.connect(mongopath);

test('checkStartup gets data for local WOEID but not for nonsense WOEID', () => {
  return Promise.all(["9807", "This is nonsense"].map(function(woeid) {
    return checkStartup(woeid);
  })).then(function(results) {
    expect(results[0].length).toBeTruthy();
    expect(results[1].length).toBeFalsy();
  });
});