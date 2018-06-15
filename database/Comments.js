const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('./index.js');
const User = require('./Users.js');

let commentSchema = Schema({
  _id: Schema.Types.ObjectId,
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  username: String,
  message: String,
  posted: { type: Date, default: Date.now }
});

let Comment = mongoose.model('Comment', commentSchema);
module.exports.Comment = Comment;

exports.saveComment = (comment) => {
  console.log('This is your comment: ', comment);
  return new Promise((resolve, reject) => {
    Comment.save({message: comment})
    .then(result => {
      resolve(result);
    }).catch(err => {
      reject(err);
    })
  })
}
