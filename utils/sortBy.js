module.exports = function(arr, key) {
    return arr.sort(function(a, b) {
        return b[key] - a[key];
    });
}