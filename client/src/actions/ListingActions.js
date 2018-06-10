import axios from 'axios';

export const FETCH_LISTINGS = 'FETCH_LISTINGS';

export const fetchListings = () =>{
  const url = `/listing`;
  const response = axios.get(url);
  return {
    type: FETCH_LISTINGS,
    payload: response
  }
}
