const db = require('../../database/Users');
const util = require('../services/utility.js');

module.exports = {
  signUp: function(req, res) {
    db.saveUser(req);
    res.status(200).send();
  },
  comparePassword: function(req, res) {

    db.loginUser(req, function(isMatch, newUser) {

      if(isMatch) {
        let newSession = util.createSession(req, res, newUser);
        newSession.user = newUser;
        console.log(newSession);
        res.status(200).send(newSession);
      } else {
        res.status(200).send(false);
      }
    });

  }
}