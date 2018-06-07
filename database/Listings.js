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

exports.markClaimed = (listing) => {
  console.log(listing, 'db listing')
  return new Promise((resolve, reject)=>{
    Listing.findByIdAndUpdate(listing, {$set: {isAvailable: false}})
    .exec().then(updated => {
      resolve(updated);
    })
    .catch(error => {
      error;
    })
  })
}

exports.deleteListing = (id)=>{
  return new Promise((resolve, reject)=>{
    Listing.findByIdAndRemove(id)
      .then(deleted=>{
        resolve(deleted);
      })
      .catch(error=>{
        reject(error);
      })
  })
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

exports.updateListing = (id, {title, description, photo, location}) => {
  return new Promise((resolve, reject) => {
    Listing.findByIdAndUpdate(id, { $set: { 'title': title, 'description': description, 'photo': photo, 'location': location } }, { new: true })
    .then(updated=>{
      resolve(updated);
    }).catch(err=>{
      reject(err);
    })
  })
};