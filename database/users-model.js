const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/greenfield');


let listingsSchema = mongoose.Schema({
  name: String,
  isFreecycle: Boolean,
  isAvailable: Boolean,
  created_at: Date,
  updated_at: Date,
  interested_users: Array,
  description: String,
  photo: String
});

let Listing = mongoose.model('Listing', listingsSchema);

module.exports.Listing = Listing;

let usersSchema = mongoose.Schema({
  username: {type: String, required: true, index: {unique: true} },
  password: {type: String, required: true},
  created_at: Date,
  my_listings: [listingsSchema], //{type: Schema.Types.ObjectId, ref: 'Listing'}
  // my_listings: [{type: Schema.Types.ObjectId, ref: 'Listing'}],
  // gifted: Number, for any information regarding 'gifted listings' we can just going into the my_listings array and filter there.
  claimed: Array,
  karma: Number,
  tokenCount: Number,
  isAdmin: Boolean
})

let User = mongoose.model('User', usersSchema);


module.exports.User = User;

let saveUser = (userData) => {

  var newUser = {};
  var parsedUser = userData.body;
  var plainTextPw = parsedUser.pw;
  var hash = bcrypt.hashSync(plainTextPw, 10);

  newUser.username = parsedUser.user;
  newUser.password = hash;
  newUser.created_at = parsedUser.created_at;
  newUser.my_listings = [];
  newUser.claimed = [];
  newUser.karma = 0;
  newUser.tokenCount = 0;
  newUser.isAdmin = false;
  var user = new User(newUser);
  user.save((err) => {
    if (err) console.log(err)
    console.log('saved user', user)
  });
};

let loginUser = (username, callback) => {
  User.findOne({username: username}, function(err, user) {
    callback(null, user.password);
  });
}

let saveListing = (listing) => {
  var parsedListing = listing.body;
  var newlisting = {};
  newlisting.name = parsedListing.name;
  newlisting.isFreecycle = parsedListing.isFreecycle;
  newlisting.isAvailable = true;
  newlisting.created_at = parsedListing.created_at;
  newlisting.updated_at = parsedListing.created_at;
  newlisting.interested_users = [];
  newlisting.description = parsedListing.description;
  //newlisting.photo = parsedListing.photo;
  var listing = new Listing(newlisting);
  listing.save((err) => {
    if (err) return console.log(err);
    console.log('saved user', user)
  })
};

// let claim = () => {
//   // will be a big method with following functionality:
//   // - Marks giver's User.my_listings[listing].isAvailable as False
//   // - Adds listing to taker's User.claimed array

// };

let give = (giver, claimant, listing) => {
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

let addInterest = (listing, user) => {
  Listing.findOne({}, (err, listing) => {
    listing.interested_users.push(user);
  })
};

let updateUser = () => {

};

let updateListing = () => {

};

// This will be default get
let getLatestListing = (cb) => {
  Listing.find((err, listings) => {
    if (err) return console.log(err);
    cb(listings);
  }).sort({created_at: -1}) //.limit(?)
}


module.exports.saveUser = saveUser;
module.exports.saveListing = saveListing;

