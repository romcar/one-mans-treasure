import { FETCH_CLAIMED_LISTINGS } from "../actions/ClaimedListingsActions";

export default (state = [], action) =>{
  switch(action.type){
    case FETCH_CLAIMED_LISTINGS: return action.payload.data;
  }
  return state;
}