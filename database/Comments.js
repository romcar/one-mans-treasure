const mongoose = require('mongoose');
const db = require('./index.js');
const User = require('./Users.js');

let commentSchema = mongoose.Schema({
  _id: Schema.Types.ObjectId,
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  username: String,
  message: String,
  posted: { type: Date, default: Date.now }
});

let Comment = mongoose.model('Comment', commentSchema);
module.exports.Comment = Comment;