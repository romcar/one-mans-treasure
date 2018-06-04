const session = require('express-session');

module.exports = {
  createSession: function(req, res, newUser) {
    return req.session.regenerate(() => {
      return;
    });
  }
}