var axios = require('axios');
var Promise = require('promise');
var values = require('object.values'); //nice little helper library for handling data

module.exports = function(searchList) {
    return new Promise(function(resolve, reject) {
        console.log("calling wikiData");
        var wikiRequests = [];
        var wikiRequest = null;
        for(var i = 0, iLen = searchList.length; i < iLen; i++) {
            wikiRequest = axios.get("https://en.wikipedia.org/w/api.php", {
                params: {
                    action: "query",
                    format: "json",
                    prop: "extracts|pageimages|pageviews",
                    generator: "search",
                    exchars: "120",
                    exlimit: "max",
                    exintro: "1",
                    explaintext: "1",
                    piprop: "thumbnail",
                    pithumbsize: "200",
                    pilimit: "max",
                    pvipdays: 1,
                    gsrsearch: searchList[i]
                }
            });
            wikiRequests.push(wikiRequest);
        }
        axios.all(wikiRequests).then(function(trends) {
            console.log("1000");
            var results = [];
            var result = [];
            var pages = [];
            for (var i = 0, iLen = trends.length; i < iLen; i++) {
                if (trends[i].data.query) {
                    result = [];
                    pages = values(trends[i].data.query.pages);
                    for (var j = 0, jLen = pages.length; j < jLen; j++) {
                        if (pages[j].thumbnail && pages[j].pageviews && pages[j].extract.length > 20) {
                            result.push({
                                title: pages[j].title,
                                extract: pages[j].extract,
                                pageviews: values(pages[j].pageviews)[0],
                                thumbnail: pages[j].thumbnail.source,
                            });
                        }
                    }
                    if (result.length) {
                        results.push(result);
                    }
                }
            }
            console.log("Received an array of length", results.length);
            resolve(results);
        });
    });
}