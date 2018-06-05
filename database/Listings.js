const mongoose = require('mongoose');
const db = require('./index.js');

let listingsSchema = mongoose.Schema({
  title: String,
  location: String,
  isAvailable: Boolean,
  interested_users: Array,
  description: String,
  photo: String
},
  {
    timestamps: true
  }
);

let Listing = mongoose.model('Listing', listingsSchema);

module.exports.Listing = Listing;

exports.saveListing = (listing) => {
  let newlisting = {};
  newlisting.title = listing.title;
  newlisting.location = listing.loc;
  newlisting.isAvailable = true;
  newlisting.interested_users = [];
  newlisting.description = listing.desc;
  newlisting.photo = listing.image;
  let listingToStore = new Listing(newlisting);
  return new Promise((resolve,reject)=>{
    listingToStore.save()
    .then(savedListing=>{
      resolve(savedListing);
    })
    .catch(error=>{
      reject(error)
    })
  })
};

exports.fetchListings = ()=>{
  return new Promise((resolve, reject)=>{
    Listing.find()
    .then(listings=>{
      resolve(listings);
    })
    .catch(error=>{
      reject(error);
    })
  })
}

// let claim = () => {
//   // will be a big method with following functionality:
//   // - Marks giver's User.my_listings[listing].isAvailable as False
//   // - Adds listing to taker's User.claimed array
// };

exports.give = (giver, claimant, listing) => {
  // different from claim, will be for the listings with interest/trade requirement
  // will be a big method with following functionality:
  // - Marks giver's User.my_listings[listing].isAvailable as False
  // - Adds listing to taker's User.claimed array
  User.findOne({username: giver.username}, (err, user) => {
    // NOTE: I'm not sure vvvv if listing.id is the right way to identify our correct listing.
    // This will take some console logging to lock down, also depends on how server side bros
    // are passing in info here.

    //HELPDESK ABOUT OR RESEARCH HOW FOREIGN KEYS WORK AND HOW TO UPDATE.
    user.my_listings[listing.name].isAvailable = false;
    user.save();
  })
  User.findOne({username: claimant.username}, (err, user) => {
    user.claimed.push(listing);
    user.save();
  })

  // FUTURE FUNCTIONALITY:
  // increment token or karma here?
}

exports.addInterest = (data) => {
  console.log(data.itemId)
  let id = data.itemId
  Listing.findById(id, function (err, listing) {
    listing.interested_users.push(data.interestedId);
  })
};

exports.updateListing = () => {
};