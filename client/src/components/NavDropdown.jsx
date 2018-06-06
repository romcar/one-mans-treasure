import React, { Component } from 'react'
import ReactDom from 'react-dom';
import { Button, Dropdown, Menu, Divider, Segment, Icon, DropdownDivider } from 'semantic-ui-react'
import ListingCreator from './ListingCreator.jsx';
import MyListings from './profileComponents/MyListings.jsx';
import {createListingService} from '../services/listingService.js';


class NavDropdown extends Component {
  constructor(props){
    super(props);
    this.state = { 
      activeItem: 'home' 
    }    
  }

  handleItemClick(e, { name }){
    this.setState({ activeItem: name })
  } 

  handleListingCreate(post){
    createListingService(post, this.props.session.user._id, (dataFromServer)=>{
      console.log(dataFromServer);
    })
  }

  logoutHandler(){
    this.props.logout();
  }

  renderDropdown(){
    if(this.props.session){
      return (<div>
        <Dropdown.Item className="ui">
          <ListingCreator handleCreate={this.handleListingCreate.bind(this)}/>
        </Dropdown.Item>
        <Dropdown.Item className="ui">
          <MyListings listings={this.props.listings}></MyListings>
        </Dropdown.Item>
        <DropdownDivider/>
        <Dropdown.Item className="ui">
          <div className="ui item" onClick={this.logoutHandler.bind(this)}>
          <Icon name="log out"/>Logout</div>
        </Dropdown.Item>
        </div>
        )
    }
  }

  render() {
    const { activeItem } = this.state

    return (
    
    <Dropdown item icon='bars' className="ui dropdown">
      <Dropdown.Menu>
        {this.renderDropdown()}
        <Dropdown.Item>
          About Us
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    )
  }
}

export default NavDropdown;