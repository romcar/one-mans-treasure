import $ from 'jquery';

export function googleMapService(zipcode, callback){
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&sensor=false`;
  $.get(url)
    .then(response=>{
      callback(response);
    })
    .catch(response=>{
      callback(response);
    });
}