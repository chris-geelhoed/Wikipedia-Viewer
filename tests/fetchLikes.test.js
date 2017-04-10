var Promise = require('promise');
var fetchLikes = require('../utils/fetchLikes.js');
var mongoose = require('mongoose');
var mongopath = require('../mongopath.js');
mongoose.connect(mongopath);

var exampleData = [
  {
    title: "Donald Trump"
  },
  {
    title: "Syria"
  }
];

test('fetchLikes appends like key to wikiData objects with valid number as a value', () => {
  return fetchLikes(exampleData).then(function (results) {
    console.log(results);
    expect(results).toBeTruthy();
    //all pages we get back should now have a 'likes' key that has a number as a value
    expect(results.every(function(page) {
      return typeof(page.likes) === "number";
    })).toBeTruthy();
  })
});