import React from 'react';
import {Icon, List, Image, Button, Dropdown} from 'semantic-ui-react';
import moment from 'moment';

class ClaimListingEntry extends React.Component{
  constructor(props){
    super(props)
  }

  renderGivaway(){
      return(
        <List.Item>
        <Image avatar src={this.props.listing.photo} />
        <List.Content>
          <div className='ui item'>Title: {this.props.listing.title}</div>
          <div className='ui item'>Listed At: {moment(this.props.listing.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
        </List.Content>
      </List.Item>
      )
  }

  render(){
    return this.renderGivaway();
  }

}

export default ClaimListingEntry;