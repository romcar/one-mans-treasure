import React from 'react'
import ReactDom from 'react-dom';
import {Container, Grid, Image, Header, Icon, Segment} from 'semantic-ui-react';
import moment from 'moment';

class ListingDetails extends React.Component{
  constructor(props){
    super(props);

  }
  
  render(){
    return(
      <Grid columns={3}>
        <Grid.Column width={2}></Grid.Column>
        <Grid.Column width={12}>
          <Segment>
            <Grid columns={2}>
              <Grid.Column width={9}>
                <Image src={this.props.listing.photo} rounded/>
              </Grid.Column>
              <Grid.Column width={7}>
                <Header>Title: {this.props.listing.title}</Header>
                <Header.Content>Listed on: {moment(this.props.listing.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</Header.Content>
              </Grid.Column>
            </Grid>
          </Segment>
        </Grid.Column>
        <Grid.Column width={2}></Grid.Column>        
      </Grid>
    )
  }
}

export default ListingDetails;