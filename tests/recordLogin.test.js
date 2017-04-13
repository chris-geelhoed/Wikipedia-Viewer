var Promise = require('promise');
var recordLogin = require('../utils/recordLogin.js');
var mongoose = require('mongoose');
var mongopath = require('../mongopath.js');
mongoose.connect(mongopath);

test('recordLogin increments visits when a repeated ip reloads the page', () => {
  var ip = "test_ip",
    geo = {
      country: "Canada",
      region: "BC",
      city: "Test City"
    };
  recordLogin(ip, geo).then(function(doc) {
    console.log(doc)
    expect(doc.visits).toBe(1);
    return recordLogin(ip, geo);
  }).then(function(doc) {
    console.log(doc);
    expect(doc.visits).toBe(2);
  });
});