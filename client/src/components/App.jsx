import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import NavBar from './NavBar.jsx';
import Listings from './Listings.jsx';
import {Container} from 'semantic-ui-react'
import {signupService, loginService} from '../services/userService.js';
import {loadListingService} from '../services/listingService.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginAs: null,
      listings: [],
    }
  }

  componentDidMount(){
    this.loadListing();
  }

  loadListing(){
    loadListingService(listings=>{
      console.log(listings);
      this.setState({
        listings: listings,
      })
    })
  }

  createAccount(user){
    signupService(user, (response)=>{
      this.setState({
        loginAs: response.username
      })
    })
  }

  userLogin(user){
    loginService(user, (response)=>{
      console.log(response);
      this.setState({
        loginAs: response
      })
    })
  }

  isLoggedIn() {

  }

  render() {
    return (
      <div>
        <NavBar
        create={this.createAccount.bind(this)}
        login={this.userLogin.bind(this)}
        isLoggedIn={this.isLoggedIn.bind(this)}
        />
        <Container>
          <Listings listings={this.state.listings}/>
        </Container>
      </div>
    )
  }
}

export default App;