import { combineReducers } from 'redux';
import ListingsReducer from './ListingsReducer';
import ClaimedListings from './ClaimedListingsReducer';
import UsersReducer from './UsersReducer';
import GoogleMapReducer from './GoogleMapReducer';

const rootReducer = combineReducers({
  listings: ListingsReducer,
  interestedUsers: UsersReducer,
  claimedListings: ClaimedListings,
  googleMap: GoogleMapReducer,
});

export default rootReducer;