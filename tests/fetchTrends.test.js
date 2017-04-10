var Promise = require('promise');
var fetchTrends = require('../utils/fetchTrends.js');

test('fetchTrends returns a list of trends given valid WOEID', () => {
  return fetchTrends("9807").then(function(trends) {
    expect(trends.length).toBeTruthy();
    expect(typeof(trends)).toBe("object");
    expect(trends.every(trend => typeof(trend) === "string")).toBeTruthy();
  });
});