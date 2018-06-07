import React from 'react';
import {Icon, List, Image, Button} from 'semantic-ui-react';
import moment from 'moment';

const MyListingEntry = (props)=>{
  const handleEdit = () =>{
    props.listingSelectHandler(props.listing);
    props.close();
  }
  return(
    <List.Item>
    <List.Content floated='right'>
      <Button inverted color='blue'><Icon name='gift'/> Givaway</Button>
      <Button inverted onClick={()=>{handleEdit()}}><Icon name='edit'/> Edit</Button>
      <Button inverted color='red' onClick={()=>{if(confirm('Are you sure you want to delete this listing?')){props.delete(props.listing)}}}><Icon name='trash alternate outline'/> Delete</Button>
    </List.Content>
    <Image avatar src={props.listing.photo} />
    <List.Content>
      <div className='ui item'>Title: {props.listing.title}</div>
      <div className='ui item'>Total Interested: {props.listing.interested_users.length}</div>
      <div className='ui item'>Listed At: {moment(props.listing.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
    </List.Content>
  </List.Item>
  )
}

export default MyListingEntry;