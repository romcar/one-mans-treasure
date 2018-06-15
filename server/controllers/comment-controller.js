const db = require('../../database/Comments');
const util = require('../services/utility.js');

module.exports = {
  comments: {
    post: function(req, res) {
      console.log('This is the request body: ', req.body)
      db.saveComment(req.body)
      .then(savedComment => {
        res.status(201).send(savedComment);
      }).catch(error => {
        res.status(401).send(error);
      })
    } 
  }

};