const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
let uriString = process.env.MONGODB_URI || 'mongodb://localhost/greenfield'
mongoose.connect(uriString);

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

let freecycleSchema = mongoose.Schema({
  title: String,
  location: String,
  description: String,
  photo: String,
  isAvailable: Boolean
},
  {
    timestamps: true
  }
);

let Freecycle = mongoose.model('Freecycle', freecycleSchema);

module.exports.Freecycle = Freecycle;

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

exports.saveUser = (userData) => {

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

exports.loginUser = (userData, callback) => {
  var user = userData.body.user;
  var password = userData.body.pw;
  User.findOne({username: user}, function(err, user) {
    if(err) {
      console.error(err);
    }
  }).then(user => {
    callback(bcrypt.compareSync(password, user.password), user);
  }).catch(err => callback(false));
}

exports.saveListing = (listing) => {
  var newlisting = {};
  newlisting.title = listing.title;
  newlisting.location = listing.loc;
  newlisting.isAvailable = true;
  newlisting.interested_users = [];
  newlisting.description = listing.desc;
  newlisting.photo = listing.image;
  var listing = new Listing(newlisting);
  return new Promise((resolve,reject)=>{
    listing.save()
    .then(savedListing=>{
      resolve(savedListing);
    })
    .catch(error=>{
      reject(error)
    })
  })
};

exports.saveFreecycle = (freecycle) => {
  var newlisting = {};
  newlisting.title = freecycle.title;
  newlisting.location = freecycle.loc;
  newlisting.description = freecycle.desc;
  newlisting.photo = freecycle.image;
  newlisting.isAvailable = true;
  var listing = new Freecycle(freecycle);
  return new Promise((resolve, reject) => {
    listing.save()
    .then(savedListing => {
      resolve(savedListing);
    })
    .catch(error => {
      reject(error);
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

exports.addInterest = (listing, user) => {
  Listing.findOne({}, (err, listing) => {
    listing.interested_users.push(user);
  })
};

exports.updateUser = () => {

};

exports.updateListing = () => {
};

