import $ from 'jquery';
import { Z_DEFAULT_STRATEGY } from 'zlib';

export function createListingService(data, callback){
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
    response = JSON.parse(response)
    console.log(response)
    $.post('/listing', {
      title: data.title,
      desc: data.desc,
      loc: data.loc,
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