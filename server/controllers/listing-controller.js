const db = require('../../database/users-model');

module.exports = {
  listings: {
    // get listing by most recent
    get: function(req, res) {
      db.Listing.find().sort({created_at: -1}).exec(function(err, listings) {
        if (err) { console.error(err) }
        console.log('Get request from server')
        res.json(listings);
      });
    },
    // create and add listing to db
    post: function(req, res) {
      // new db.Listing.save(req.body).then(function(err, newListing) {
      //   if (err) { console.error(err); }
      //   console.log('Post request from server')
      //   res.writeHead(201);
      //   res.end(newListing);
      // });
      db.saveListing(req); //maybe attach promise here?
      res.end();
    }
  }
}
