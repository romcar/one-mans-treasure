import React from 'react'
import ReactDom from 'react-dom';
import { Grid, Segment } from 'semantic-ui-react';
import ListingEntry from '../components/ListingEntry.jsx';

class Listings extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Grid doubling columns={3}>
        {this.props.listings.map(listing=> 
          <ListingEntry listing={listing} key={listing._id}/>
        )}
      </Grid>
    )
  }
}

export default Listings;
