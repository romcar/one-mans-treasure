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
    console.log(JSON.parse(response));
  })
  .catch(error=>{
    console.log(error);
  })
}