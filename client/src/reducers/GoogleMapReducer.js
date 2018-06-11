import { FETCH_GOOGLE_MAP } from "../actions/ListingActions";

export default (state = null, action) =>{
  switch(action.type){
    case FETCH_GOOGLE_MAP: return action.payload.data;
  }
  return state;
}