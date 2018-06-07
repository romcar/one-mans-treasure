import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import NavBar from './NavBar.jsx';
import Listings from './Listings.jsx';
import ListingDetails from './ListingDetails.jsx';

import {Container} from 'semantic-ui-react'
import {signupService, loginService} from '../services/userService.js';
import {updateListingService, loadListingService, createListingService,
  listingInterestService, deleteListingService} from '../services/listingService.js';

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

  renderBody(){
    if(this.state.view === 'listings'){
      return (<Listings interestHandler={this.markInterest.bind(this)} selectHandler={this.listingSelectHandler.bind(this)}
      listings={this.state.listings}/>)
    } else if(this.state.view === 'single') {
      return <ListingDetails
      user={this.state.loginAs === null ? this : this.state.loginAs.user._id}
      listing={this.state.selectedListing}
      updateChanges={this.updateChanges.bind(this)}
      />
    }
  }

  render() {
    return (
      <div>
        <NavBar
        listings={this.state.listings}
        session={this.state.loginAs}
        create={this.createAccount.bind(this)}
        createListing={this.createListing.bind(this)}
        delete={this.deleteListing.bind(this)}
        homeHandler={this.homeHandler.bind(this)}
        login={this.userLogin.bind(this)}
        logout={this.userLogout.bind(this)}
        listingSelectHandler={this.listingSelectHandler.bind(this)}
        />
        <Container>
          {this.renderBody()}
        </Container>
      </div>
    )
  }

  componentDidMount(){
    this.loadListing();
  }

  createListing(listing, userId){
    createListingService(listing, userId, (response)=>{
      this.loadListing();
    })
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
      console.log(response, 'back in app');
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

  homeHandler(){
    this.setState({
      view: 'listings',
      selectedListing: ''
    })
  }

  // renderBody(){
  //   if(this.state.view === 'listings'){
  //     return (<Listings interestHandler={this.markInterest.bind(this)} selectHandler={this.listingSelectHandler.bind(this)}
  //     user={this.state.loginAs}
  //     listings={this.state.listings}/>)
  //   } else if(this.state.view === 'single') {
  //     return <ListingDetails user={this.state.loginAs} listing={this.state.selectedListing}/>
  //   }
  // }

  updateChanges(changes, oldListing){
    updateListingService(changes, oldListing, (response)=>{
      this.loadListing();
    })
  }
}

export default App;