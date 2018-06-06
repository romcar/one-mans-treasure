import React from 'react'
import ReactDom from 'react-dom';
import { Grid, Segment } from 'semantic-ui-react';
import ListingEntry from '../components/ListingEntry.jsx';
import {interestCount} from '../services/listingService.js';

class Listings extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loggedInAs: 'ooga booga',
      currentListing: '5b157f09926cc09b02e54d09'
    }
  }

  markInterest () {
    interestCount(this.state , (serverRes) => {
      console.log(serverRes);
    })
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
