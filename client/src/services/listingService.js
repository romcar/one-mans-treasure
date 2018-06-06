import $ from 'jquery';
import { Z_DEFAULT_STRATEGY } from 'zlib';

export function createListingService(data, userId, callback){
  console.log(data)
  let formData = new FormData();
  formData.append("image", data.image)
  $.ajax({
    type:'POST',
    url: 'https://api.imgur.com/3/image',
    data: formData,
    crossDomain: true,
    processData: false,
    contentType: false,
    headers: {
      Authorization: 'Client-ID ' + "276a9fab62145b0",
      Accept: 'application/json'
    },
    mimeType: 'multipart/form-data',
  })
  .then(response=>{
    console.log(userId)
    response = JSON.parse(response)
    console.log(response)
    $.post('/listing', {
      title: data.title,
      desc: data.desc,
      loc: data.loc,
      userId: userId,
      image: response.data.link
    })
    .then(serverRes=>{
      callback(serverRes);
    })
    .catch(error=>{
      callback(error);
    })
  })
  .catch(error=>{
    callback(error);
  })
}

export function loadListingService(callback){
  $.get('/listing')
    .then(response=>{
      callback(response);
    })
    .catch(error=>{
      callback(response);
    })
}

export function listingInterestService(id, user, claimed ,callback){
  $.ajax({
    type:'PUT',
    url: '/listing/interest',
    data: {
      id: id,
      claimed: claimed,
      userId: user,
    },
  })
  .then(response=>{
    callback(response);
  })
  .catch(error=>{
    callback(error);
  })
}

export function deleteListingService(id, callback){
  $.ajax({
    type:'DELETE',
    url: `/listing/${id}`,
  })
  .then(response=>{
    callback(response);
  })
  .catch(error=>{
    callback(error);
  })
}

export function updateListingService(id, change) {
  $.ajax({
    type:'PUT',
    url: `/listing/${id}`,
    data: {
      changes: change // => this will be an object sent to server
    }
  })
  .then(response=>{
    callback(response);
  })
  .catch(error=>{
    callback(error);
  })
}