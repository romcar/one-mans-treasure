import { combineReducers } from 'redux';
import ListingsReducer from './ListingsReducer';
import ClaimedListings from './ClaimedListingsReducer';
import UsersReducer from './UsersReducer';

const rootReducer = combineReducers({
  listings: ListingsReducer,
  interestedUsers: UsersReducer,
  claims: ClaimedListings,
});

export default rootReducer;