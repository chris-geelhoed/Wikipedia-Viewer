var Promise = require('promise');
var fetchWiki = require('../utils/fetchWiki.js');

var trends = ["cookie", "donald trump", "oreos", "apple", "google", "canada", "selena gomez"];
test('fetchWiki returns a list of wikipedia pages given a list of trends', () => {
  return fetchWiki(trends).then(function(wikiData) {
    expect(wikiData).toBeTruthy();
    expect(wikiData.length).toBeLessThanOrEqual(trends.length);
    //this makes sure that every result found has a title, extract, thumbnail, and pageview number
    expect(wikiData.every(result => {
      return result.every(page => {
        return page.title && page.extract && page.thumbnail && typeof(page.pageviews) === "number";
      });
    })).toBeTruthy();
  });
});