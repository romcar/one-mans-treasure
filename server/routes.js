const listingCtrl = require('./controllers/listing-controller');
const userCtrl = require('./controllers/user-controller');
const router = require('express').Router();

router.post('/signup', /*REPLACE_ME_WITH_FUNCTION_FROM_USER_CONTROLLER*/);
router.post('/login', /*REPLACE_ME_WITH_FUNCTION_FROM_USER_CONTROLLER*/);

router.post('/listing', listingCtrl.listings.post);
router.get('/listing/latest', listingCtrl.listings.get);
router.get('/listing/nearest', /*REPLACE_ME_WITH_FUNCTION_FROM_LISTING_CONTROLLER*/);

router.post('/claim', /*REPLACE_ME_WITH_FUNCTION_FROM_LISTING_CONTROLLER*/);
router.post('/resolve', /*REPLACE_ME_WITH_FUNCTION_FROM_LISTING_CONTROLLER*/);

// router.post('/upvote', )

module.exports = router;