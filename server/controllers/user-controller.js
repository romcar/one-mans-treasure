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
  },
  signUp: function(req, res) {
    db.saveUser(req);
    console.log('server sign up', req.body);
    res.end();
  },
  comparePassword: function(req, res) {
    db.loginUser(req.body);
    res.end(); //not sure if this is the right way to do this... will probably have to help desk.
    // let user = req.body.user;
    // let passwordAttempt = req.body.pw;
    // //console.log('This is the req: ', req.body);
    // console.log(user, passwordAttempt)
    // // need mapper function to retrieve username's hashed password
    // let isMatch = bcrypt.compareSync(passwordAttempt, loginUser(user, ) );
    // if (isMatch) {
    //   res.send(isMatch);
    // } else {
    //   res.status(404).send('Not found');
    // }
  }
}