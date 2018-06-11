import React from 'react';
import NavBar from './NavBar.jsx';
import Listings from './Listings.jsx';
import ListingDetails from './ListingDetails.jsx';
import {Container} from 'semantic-ui-react'
import {signupService, loginService} from '../services/userService.js';
import {updateListingService, createListingService, givawayListingService,
  listingInterestService, deleteListingService} from '../services/listingService.js';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchListings} from '../actions/ListingActions';
import GoogleMap from './GoogleMap.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      loginAs: null,
      view: 'listings',
      selectedListing: '',
    }
    
  }

  renderBody(){
    if(this.state.view === 'listings'){
      return (<Listings interestHandler={this.markInterest.bind(this)} selectHandler={this.listingSelectHandler.bind(this)}
      listings={this.props.listings}/>)
    } else if(this.state.view === 'single') {
      return <ListingDetails
      user={this.state.loginAs === null ? this : this.state.loginAs.user._id}
      map={this.state.map}
      listing={this.state.selectedListing}
      updateChanges={this.updateChanges.bind(this)}
      />
    }
  }

  render() {
    return (
      <div>
        <NavBar
        listings={this.props.listings}
        session={this.state.loginAs}
        create={this.createAccount.bind(this)}
        createListing={this.createListing.bind(this)}
        delete={this.deleteListing.bind(this)}
        homeHandler={this.homeHandler.bind(this)}
        login={this.userLogin.bind(this)}
        logout={this.userLogout.bind(this)}
        listingSelectHandler={this.listingSelectHandler.bind(this)}
        giveHandler={this.giveHandler.bind(this)}
        />

        <Container>
          {this.renderBody()}
        </Container>
      </div>
    )
  }

  componentDidMount(){
    this.props.fetchListings();
  }

  createListing(listing, userId){
    createListingService(listing, userId, (response)=>{
      this.props.fetchListings();
    })
  }

  deleteListing(listing){
    deleteListingService(listing._id, (deleted)=>{
      this.props.fetchListings();
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
        this.props.fetchListings();
      })
    } else if (index < 0) {
      listingInterestService(_id, user, false ,(serverRes) => {
        this.props.fetchListings();
      })
    }
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
      if(response === false) {
        alert('you messed up dawg');
      } else {
        this.setState({
          loginAs: response
        });
      }
    })
  }

  userLogout(){
    this.setState({
      loginAs: null,
    })
  }

  listingSelectHandler(selected, mapInfo){
    this.setState({
      view: 'single',
      map: mapInfo,
      selectedListing: selected
    })
  }

  homeHandler(){
    this.setState({
      view: 'listings',
      selectedListing: ''
    })
  }

  updateChanges(changes, oldListing){
    updateListingService(changes, oldListing, (response)=>{
      this.props.fetchListings();
    })
  }

  giveHandler(input){
    console.log(input, 'HALLELUJIA')
    givawayListingService(input, (response)=>{
      this.props.fetchListings();
    })
  }
}

const mapStateToProps = ({listings}) =>{
  return {listings}; 
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({fetchListings}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);