const db = require('../../database/users-model');
const session = require('express-session');

module.exports = {
  signUp: function(req, res) {
    db.saveUser(req)
    res.end();
  },
  comparePassword: function(req, res) {
    db.loginUser(req);
    res.end();
  }
}