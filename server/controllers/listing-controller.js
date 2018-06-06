const db = require('../../database/Listings');

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
      //if FC then db.saveFC
      db.saveListing(req.body)
        .then(savedListing=>{
          res.status(201).send(savedListing);
        })
        .catch(error=>{
          res.status(401).send(error);
        })
    },

    setInterest: function(req, res) {
      db.updateInterest(req.body)
        .then(updated=>{
          res.status(201).send(updated);
        })
        .catch(error=>{
          res.status(401).send(error);
        })
    },

  }
}
