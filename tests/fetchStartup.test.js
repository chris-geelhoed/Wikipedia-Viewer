var Promise = require('promise');
var fetchStartup = require('../utils/fetchStartup.js');
var mongoose = require('mongoose');
var mongopath = require('../mongopath.js');
mongoose.connect(mongopath);

test('fetchStartup gets data', () => {
  return fetchStartup("9807").then(data => {
    expect(data).toBeTruthy();
  });
});