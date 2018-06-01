import $ from 'jquery';

export function signup(user, callback){
  $.post('/signup', {
    userData: user
  })
  .done(response=>{
    callback(response);
  })
  .fail(error=>{
    callback(error);
  })
}

export function login(user, callback){
  console.log(user);
  $.post('/login', {
    userData: user
  })
  .done(response=>{
    callback(reponse);
  })
  .fail(error=>{
    callback(error);
  })
}
