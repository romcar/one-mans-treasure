const db = require('../../database/users-model');
const session = require('express-session');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

module.exports = {
  get: function() {

  },
  post: function(req, res) {
    let user = req.body.user;
    user.password = bcrypt.hashSync(user.password, 10);
    db.saveUser(user, function(savedData) {
      console.log(savedData);
      res.status(201).send(savedData);
    });
  }
}