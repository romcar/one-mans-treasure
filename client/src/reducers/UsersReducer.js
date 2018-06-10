import { FETCH_INTERESTED_USERS } from "../actions/UserActions";

export default (state = [], action) =>{
  switch(action.type){
    case FETCH_INTERESTED_USERS: return action.payload.data;
  }
  return state;
}

