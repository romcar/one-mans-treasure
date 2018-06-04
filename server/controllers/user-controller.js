const db = require('../../database/users-model');
const session = require('express-session');

module.exports = {
  signUp: function(req, res) {
    db.saveUser(req)
    res.send();
  },
  comparePassword: function(req, res) {
    db.loginUser(req, function(isMatch) {
      if(isMatch) {
        res.status(200).send(isMatch);
      } else {
        res.status(200).send(false);
      }
    });

  }
}