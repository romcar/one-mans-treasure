import React from 'react';
import ReactDom from 'react-dom';
import {Icon, List, Image, Button, Dropdown} from 'semantic-ui-react';
import moment from 'moment';

class ClaimListingEntry extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      view: 'listings',
      users: this.props.listing.interested_users,
      user: '',
    }
  }

  handleEdit(){
    this.props.listingSelectHandler(this.props.listing);
    this.props.close();
  }

  handleGivaway(){
    
  }

  handleRenderGivaway(){
    this.setState({
      view: 'givaway',
    })
  }

  handleSelect(event){
    console.log(event.target)
    this.setState({
      user: event.target.value,
    })
  }

  handleCloseGivaway(){
    this.setState({
      view: 'listings',
    })
  }

  renderGivaway(){
    if(this.state.view === 'listings'){
      return(
        <List.Item>
        <List.Content floated='right'>
          <Button inverted onClick={this.handleRenderGivaway.bind(this)} color='blue'><Icon name='gift'/> Give</Button>
          <Button inverted onClick={this.handleEdit.bind(this)}><Icon name='edit'/> Edit</Button>
          <Button inverted color='red' onClick={()=>{if(confirm('Are you sure you want to delete this listing?')){this.props.delete(this.props.listing)}}}><Icon name='trash alternate outline'/> Delete</Button>
        </List.Content>
        <Image avatar src={this.props.listing.photo} />
        <List.Content>
          <div className='ui item'>Title: {this.props.listing.title}</div>
          <div className='ui item'>Total Interested: {this.props.listing.interested_users.length}</div>
          <div className='ui item'>Listed At: {moment(this.props.listing.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
        </List.Content>
      </List.Item>
      )
    } else if(this.state.view === 'givaway'){
      console.log(this.props.listing)
      return(

        <List.Item>
          <select className='ui dropdown button' onChange={this.handleSelect.bind(this)}>
            {this.state.users.map(user=>
              <option value={user}>{user}</option>
            )}
          </select>
          <Button inverted> Cancel</Button>
          <Button color='blue' inverted onClick={()=>{if(confirm(`Are you sure you want to give it to ${this.state.user}?`)){this.handleGivaway.bind(this)}}}>
          <Icon name='gift'/> Givaway</Button>
        </List.Item>
      )
    }
  }

  render(){
    return this.renderGivaway();
  }

}

export default ClaimListingEntry;

// <Dropdown inline
// onChange={this.handleSelect.bind(this)}
// {this.state.users.map()}
// placeholder='Please choose an user to givaway your freebie.'
// value={this.state.user}
// />