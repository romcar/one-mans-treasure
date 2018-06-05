import React from 'react'
import ReactDom from 'react-dom';
import {Container, Grid, Image, Header, Icon, Segment} from 'semantic-ui-react';

class ListingDetails extends React.Component{
  constructor(props){
    super(props);

  }
  
  render(){
    return(
    <Segment>
    <Grid>
      <Grid.Column width={7}>
        <Image src={this.props.listing.photo} />
      </Grid.Column>
      <Grid.Column width={5}>
        <Segment textAlign='center'>
          <Header>Description</Header>
          {this.props.listing.description}
        </Segment>
      </Grid.Column>
      <Grid.Column width={4}>
        <Segment>
        <Header>Title: {this.props.listing.title}</Header>
        <Header.Content>Listed on: {this.props.listing.createdAt}</Header.Content>
        </Segment>
      </Grid.Column>
    </Grid>
    </Segment>
    )
  }
}

export default ListingDetails;