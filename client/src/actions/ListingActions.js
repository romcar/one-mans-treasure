import axios from 'axios';

export const FETCH_LISTINGS = 'FETCH_LISTINGS';
export const FETCH_CLAIMED_LISTINGS = 'FETCH_CLAIMED_LISTINGS';
export const FETCH_GOOGLE_MAP = 'FETCH_GOOGLE_MAP';

export const fetchListings = () =>{
  const url = `/listing`;
  const response = axios.get(url);
  return {
    type: FETCH_LISTINGS,
    payload: response
  }
}

export const fetchClaimedListings = (listingsId) =>{
  const url = `/listing/claimed`;
  const response = axios.post(url, {listingsId});
  return {
    type: FETCH_CLAIMED_LISTINGS,
    payload: response
  }
}

export const fetchGoogleMap = (zipcode)=>{
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&sensor=false`;
  const response = axios.get(url);
  return {
    type: FETCH_GOOGLE_MAP,
    payload: response
  }
}