import { FETCH_LISTINGS } from "../actions/ListingActions";

export default (state = [], action) =>{
  switch(action.type){
    case FETCH_LISTINGS: return action.payload.data;
  }
  return state;
}