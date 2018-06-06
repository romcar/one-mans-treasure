const mongoose = require('mongoose');
const db = require('./index.js');

let listingsSchema = mongoose.Schema({
  title: String,
  location: String,
  listedBy: String,
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
  console.log(listing)
  let newlisting = {};
  newlisting.title = listing.title;
  newlisting.location = listing.loc;
  newlisting.listedBy = listing.userId;
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

exports.updateInterest = ({id, userId, claimed})=>{
  return new Promise((resolve, reject)=>{
    if(JSON.parse(claimed) === true){
      Listing.findByIdAndUpdate(id, {$pull:{interested_users:{$in: userId}}})
      .exec().then(updated=>{
        resolve(updated);
      })
      .catch(error=>{
        error;
      })
    } else {
      Listing.findByIdAndUpdate(id, {$push:{interested_users: userId}})
      .exec().then(updated=>{
        resolve(updated);
      })
      .catch(error=>{
        error;
      })
    }
  })
}

// exports.addInterest = (listingData, callback) => {
//   let id = listingData.itemId;
//   Listing.findById(id, function (err, listing) {
//     if (err) {
//       console.log(err, 'line 89');
//     }
//     listing.interested_users.push(listingData.interestedId);
//     listing.save();
//   })
//   .then(success => {callback(true);})
//   .catch(err => callback(false));
// };

// exports.removeInterest = (listingData, callback) => {
//   let id = listingData.itemId;
//   Listing.findById(id, function (err, listing) {
//     if (err) {
//       console.log(err, 'line 102');
//     }
//     listing.interested_users.splice(listingData.interestedId, 1);
//     listing.save();
//   })
//   .then(success => {callback(true);})
//   .catch(err => callback(false));
// };

exports.updateListing = () => {
};