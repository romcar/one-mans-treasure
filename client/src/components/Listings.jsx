import React from 'react'
import ReactDom from 'react-dom';
import { Grid, Segment } from 'semantic-ui-react';
import ListingEntry from '../components/ListingEntry.jsx';
import {addInterest, removeInterest} from '../services/listingService.js';

class Listings extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      selectedListing : []
    }
  }

  markInterest (listingId, interestArray) {
    if (this.props.user === null) {
      console.log('Please login to claim items!')
      return;
    }
    console.log(interestArray)
    let user = this.props.user.user._id;
    console.log(user)
    let index = interestArray.indexOf(user);
    let interestInfo = {
      loggedInAs: user,
      currentListing: listingId
    }

    if (index >= 0) {
      //decrement
      removeInterest(interestInfo, (serverRes) => {
        console.log('decremented');
      })
    } else if (index < 0) {
      //increment
      addInterest(interestInfo, (serverRes) => {
        console.log('incremented');
      })
    }
  }

  setCurrentListing (listing) {
    this.setState({
      currentListing: listing
    })
    console.log(this.state)
  }

  render(){
    return(
      <Grid doubling columns={4}>
        {this.props.listings.map(listing=>
          <ListingEntry listing={listing} key={listing._id}
          handleClaim={this.markInterest.bind(this)}
          selectHandler={this.props.selectHandler.bind(this)}
          />
        )}
      </Grid>
    )
  }
}

export default Listings;

// onMouseEnter={this.setCurrentListing(listing._id)}
