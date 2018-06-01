const db = require('../../database/users-model');
const session = require('express-session');

module.exports = {
  signUp: function(req, res) {
    db.saveUser(req)
    res.send();
  },
  comparePassword: function(req, res) {
<<<<<<< HEAD

    db.loginUser(req);
    res.end();
=======
    db.loginUser(req, function(isMatch) {
      if(isMatch) {
        res.status(200).send(isMatch);
      } else {
        res.status(200).send(false);
      }
    });
>>>>>>> 05f70ef502e716a18105e8d0a7eae75c9d26f68b
  }
}