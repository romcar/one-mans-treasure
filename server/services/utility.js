const session = require('express-session');
const listingDb = require('../../database/Listings');
const userDb = require('../../database/Users');

module.exports = {
  createSession: function(req, res, newUser) {
    return req.session.regenerate(() => {
      return;
    });
  },

  giveListing: function(data) {
    /* THINGS THAT NEED TO HAPPEN:
    - LISTING HAS TO BE MARKED UNAVAILABLE
    - LISTING HAS TO BE ADDED TO RECEIVERS CLAIMED ARR
    - ??MODIFY GIVER SCHEMA??
    */
    let giverId = data.giver;
    let receiverId =  data.receiver;
    let listingId = data.listing;
    userDb.claimItem(receiverId, listingId)
    .then(response => {
        console.log('claim here');
    })
    .catch(error => {
      console.log('item not placed in claim array')
    })
    listingDb.markClaimed(listingId)
      .then(response => {
        console.log('marked here');
      })
      .catch(error => {
        console.log('item not marked claimed')
      })
  }
}
