import { FETCH_LISTINGS, SET_QUERY } from "../actions/ListingActions";

export default (state = {}, action) =>{
  switch(action.type){
    case FETCH_LISTINGS: return {
      listings: action.payload.data,
      query: state.query
    };
    case SET_QUERY: return {
      query: action.payload,
      listings: state.listings
    };
  }
  return state;
}
