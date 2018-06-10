import axios from 'axios';

export const FETCH_CLAIMED_LISTINGS = 'FETCH_LISTINGS';

export const fetchClaimedListings = (listingsId) =>{
  console.log(listingsId)
  const url = `/listing/claimed`;
  const response = axios.post(url, {listingsId: listingsId})
  return {
    type: FETCH_CLAIMED_LISTINGS,
    payload: response
  }
}