module.exports = function (wikiData) {
    return wikiData.map(function (trend) {
        return trend.sort(function (a, b) {
            return b.pageviews - a.pageviews;
        })[0];
    });
}