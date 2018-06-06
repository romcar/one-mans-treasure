import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import NavBar from './NavBar.jsx';
import Listings from './Listings.jsx';
import ListingDetails from './ListingDetails.jsx';

import {Container} from 'semantic-ui-react'
import {signupService, loginService} from '../services/userService.js';
import {loadListingService, listingInterestService, deleteListingService} from '../services/listingService.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginAs: null,
      listings: [],
      view: 'listings',
      selectedListing: '',
    }
  }

  componentDidMount(){
    this.loadListing();
  }

  deleteListing(listing){
    deleteListingService(listing._id, (deleted)=>{
      this.loadListing();
    });
  }

  markInterest ({interested_users, _id}) {
    if (this.state.loginAs === null) {
      console.log('Please login to claim items!')
      return;
    }
    let user = this.state.loginAs.user._id;
    let index = interested_users.indexOf(user);
    if (index >= 0) {
      listingInterestService(_id, user, true, (serverRes) => {
        this.loadListing();
      })
    } else if (index < 0) {
      listingInterestService(_id, user, false ,(serverRes) => {
        this.loadListing();        
      })
    }
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
        loginAs: response
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

  userLogout(){
    this.setState({
      loginAs: null,
    })
  }

  listingSelectHandler(selected){
    this.setState({
      view: 'single',
      selectedListing: selected
    })
  }

  renderBody(){
    if(this.state.view === 'listings'){
      return (<Listings interestHandler={this.markInterest.bind(this)} selectHandler={this.listingSelectHandler.bind(this)} 
      user={this.state.loginAs} 
      listings={this.state.listings}/>)
    } else if(this.state.view === 'single') {
      return <ListingDetails user={this.state.loginAs} listing={this.state.selectedListing}/>
    }
  }

  render() {
    return (
      <div>
        <NavBar
        listings={this.state.listings}
        logout={this.userLogout.bind(this)}
        session={this.state.loginAs}
        create={this.createAccount.bind(this)}
        login={this.userLogin.bind(this)}
        delete={this.deleteListing.bind(this)}
        />
        <Container>
          {this.renderBody()}
        </Container>
      </div>
    )
  }
}

export default App;