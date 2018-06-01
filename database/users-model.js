// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/greenfield');

// let listingsSchema = mongoose.Schema({
//   isFreecycle: Boolean,
//   isAvailable: Boolean,
//   created_at: Date,
//   updated_at: Date,
//   interested_users: Array,
//   description: String,
//   photo: String
// });

// let Listing = mongoose.model('Listing', listingsSchema);

// module.exports.Listing = Listing;

// let usersSchema = mongoose.Schema({
//   username: String,
//   password: String,
//   created_at: Date,
//   my_listings: [{type: Schema.Types.ObjectId, ref: 'Listing'}],
//   // gifted: Number, for any information regarding 'gifted listings' we can just going into the my_listings array and filter there.
//   claimed: Array,
//   karma: Number,
//   tokenCount: Number,
//   isAdmin: Boolean
// })

// let User = mongoose.model('User', usersSchema);


// module.exports.User = User;

// let saveUser = (userData) => {
//   var parsedUser = JSON.parse(userData.body);
//   var newUser = {};
//   newUser.username = parsedUser.username;
//   newUser.password = parsedUser.password;
//   newUser.created_at = parsedUser.created_at;
//   newUser.my_listings = [];
//   newUser.claimed = [];
//   newUser.karma = 0;
//   newUser.tokenCount = 0;
//   newUser.isAdmin = false;
//   var user = new User(newUser);
//   user.save((err) => {
//     if (err) return console.log(err)
//     console.log('new user created!', user);
//   });
// };

// let getUser = (credentials) => {
//   //User.find(function(err, credentials))
// }

// let saveListing = (listing) => {

// };

// let claim = (listing) => {
//   // will be a big method with following functionality:
//   // - Marks giver's User.my_listings[listing].isAvailable as False
//   // - Adds listing to taker's User.claimed array
// };

// let addInterest = (listing) => {

// };

// let updateUser = () => {

// };

// let updateListing = () => {

// };

// module.exports.saveUser = saveUser;
