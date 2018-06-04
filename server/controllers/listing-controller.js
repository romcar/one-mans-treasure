const db = require('../../database/users-model');

module.exports = {
  listings: {
    // get listing by most recent
    get: function(req, res) {
      db.fetchListings()
        .then(listings=>{
          res.status(200).send(listings);
        })
        .catch(error=>{
          res.status(401).send(error);
        })
    },
    // create and add listing to db
    post: function(req, res) {
      db.saveListing(req.body)
        .then(savedListing=>{
          res.status(201).send(savedListing);
        })
        .catch(error=>{
          res.status(401).send(error);
        })
    }
  }
}
