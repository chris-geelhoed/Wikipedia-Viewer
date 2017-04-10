var mongoose = require('mongoose');
var Search = require('../models/Search.js');

module.exports = function(entry) {
    new Search(entry).save(function(error) {
        if (error) {
        	throw error;
        }
    });
}