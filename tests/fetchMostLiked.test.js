var Promise = require('promise');
var fetchMostLiked = require('../utils/fetchMostLiked.js');
var mongoose = require('mongoose');
var mongopath = require('../mongopath.js');
mongoose.connect(mongopath);

test('fetchMostLiked gets 10 or less results and each result has at least one like, thumbnail, title, extract, and pageviews', () => {
  return fetchMostLiked().then(data => {
    expect(data).toBeTruthy();
    expect(data.every(function(result) {
      return result.likes >= 1 && result.thumbnail && result.title && result.extract && result.pageviews;
    })).toBeTruthy();
    expect(data.length).toBeLessThanOrEqual(10);
  });
});