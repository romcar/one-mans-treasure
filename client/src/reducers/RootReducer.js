import { combineReducers } from 'redux';
import ListingsReducer from './ListingsReducer';
import ClaimedListings from './ClaimedListingsReducer';
import UsersReducer from './UsersReducer';

const rootReducer = combineReducers({
  listings: ListingsReducer,
  interestedUsers: UsersReducer,
  claimedListings: ClaimedListings,
});

export default rootReducer;