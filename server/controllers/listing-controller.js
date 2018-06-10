const db = require('../../database/Listings');
const util = require('../services/utility.js');

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

    delete: function(req, res) {
      db.deleteListing(req.params.listingId)
      .then(deleted=>{
        res.status(201).send(deleted);
      })
      .catch(error=>{
        res.status(401).send(error);
      })
    },


    update: function(req, res) {
      db.updateListing(req.params.listingId, req.body)
      .then(updated=>{
        res.status(201).send(updated);
      })
      .catch(error=>{
        res.status(401).send(error);
      })
    },

    give: function(req, res) {
      console.log(req.body, 'controller')
      util.giveListing(req.body)
      .then(given=>{
        res.status(201).send(given);
      })
      .catch(error=>{
        res.status(401).send(error);
      })
    },

    getClaimedListings: (req, res)=>{
      db.fetchClaimedListing(req.body.listingsId)
        .then(claimed=>{
          console.log(claimed)
          res.status(201).send(given);
        })
        .catch(error=>{
          res.status(401).send(error);
        })
    }

  }
}