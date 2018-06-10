import { FETCH_CLAIMED_LISTINGS } from "../actions/ListingActions";

export default (state = [], action) =>{
  console.log(action.payload)
  switch(action.type){
    case FETCH_CLAIMED_LISTINGS: return action.payload.data;
  }
  return state;
}