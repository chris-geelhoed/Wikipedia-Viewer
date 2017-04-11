var mongoose = require('mongoose');

var likeSchema = mongoose.Schema({
  title: String,
  ip: String,
  accepted: Boolean, //weather or not the server accepts the like request
});

module.exports = mongoose.model('Like', likeSchema);