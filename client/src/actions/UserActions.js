import axios from 'axios';

export const FETCH_INTERESTED_USERS = 'FETCH_INTERESTED_USERS';

export const fetchInterestedUsers = (users) => {
  console.log(users);
  const url = `/interestedUsers`;
  const response = axios.put(url, {users});
  return {
    type: FETCH_INTERESTED_USERS,
    payload: response
  }
}