import { combineReducers } from 'redux';
import ListingsReducer from './ListingsReducer';
import UsersReducer from './UsersReducer';

const rootReducer = combineReducers({
  listings: ListingsReducer,
  interestedUsers: UsersReducer,
});

export default rootReducer;