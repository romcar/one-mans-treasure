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
    Listing.find({isAvailable: true})
    .sort({createdAt: -1})
    .limit(12)
    .exec()
    .then(listings=>{
      console.log(listings)
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
  console.log(id, userId, claimed)
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

exports.updateListing = (id, {title, desc, image, loc}) => {
  return new Promise((resolve, reject) => {
    Listing.findByIdAndUpdate(id, { $set: { 'title': title, 'description': desc, 'photo': image, 'location': loc } }, { new: true })
    .then(updated=>{
      resolve(updated);
    }).catch(err=>{
      reject(err);
    })
  })
};

exports.fetchClaimedListing = (listings)=>{
  return new Promise((resolve, reject)=>{
    Listing.find({_id: {$in: listings}})
    .then(claimedListings=>{
      resolve(claimedListings)
    })
    .catch(error=>{
      reject(error)
    })
  })
}