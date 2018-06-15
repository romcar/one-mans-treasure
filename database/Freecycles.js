// const mongoose = require('mongoose');
// const db = require('./index.js');

// let freecycleSchema = mongoose.Schema({
//   title: String,
//   location: String,
//   description: String,
//   photo: String,
//   isAvailable: Boolean
// },
//   {
//     timestamps: true
//   }
// );

// let Freecycle = mongoose.model('Freecycle', freecycleSchema);

// module.exports.Freecycle = Freecycle;

// exports.saveFreecycle = (freecycle) => {
//   let newlisting = {};
//   newlisting.title = freecycle.title;
//   newlisting.location = freecycle.loc;
//   newlisting.description = freecycle.desc;
//   newlisting.photo = freecycle.image;
//   newlisting.isAvailable = true;
//   let listing = new Freecycle(freecycle);
//   return new Promise((resolve, reject) => {
//     listing.save()
//     .then(savedListing => {
//       resolve(savedListing);
//     })
//     .catch(error => {
//       reject(error);
//     })
//   })
// };
