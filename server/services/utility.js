const session = require('express-session');
const listingDb = require('../../database/Listings');
const userDb = require('../../database/Users');

module.exports = {
  createSession: function(req, res, newUser) {
    return req.session.regenerate(() => {
      return;
    });
  },

  giveListing: function(giverId, receiverId, listingId) {
    /* THINGS THAT NEED TO HAPPEN:
    - LISTING HAS TO BE MARKED UNAVAILABLE
    - LISTING HAS TO BE ADDED TO RECEIVERS CLAIMED ARR
    - ??MODIFY GIVER SCHEMA??
    */
    listingDb.markClaimed(listingId);
    userDb.claimItem(receiverId, listingId);
  }
}
