import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import NavBar from './NavBar.jsx';
import {signup, login} from '../services/userService.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginAs: null
    }
  }

  createAccount(user){
    signup(user, (response)=>{
      console.log(`this is from server ${response}`);
      this.setState({
        loginAs: response.username
      })
    })
  }

  userLogin(user){
    console.log(login)
    login(user, (response)=>{
      console.log(`this is from server ${response} | login`);
      this.setState({
        loginAs: response.username
      })
    })
  }

  render() {
    return (
      <div>
        <NavBar
        create={this.createAccount.bind(this)}
        login={this.userLogin.bind(this)}
        />

      </div>
    )
  }
}

export default App;