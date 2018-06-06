import React, { Component } from 'react'
import ReactDom from 'react-dom';
import { Button, Dropdown, Menu, Divider, Segment, Icon, DropdownDivider } from 'semantic-ui-react'
import ListingCreator from './ListingCreator.jsx';
import MyListings from './profileComponents/MyListings.jsx';
import {createListingService} from '../services/listingService.js';


class NavDropdown extends Component {
  constructor(props){
    super(props);  
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

  renderUserDropdown(){
      return (
        <Dropdown.Menu>
          {this.props.session ? <Dropdown.Item>
            <ListingCreator handleCreate={this.handleListingCreate.bind(this)}/>
          </Dropdown.Item> : false}

          {this.props.session ? <Dropdown.Item>
            <MyListings listings={this.props.listings} 
            delete={this.props.delete.bind(this)}>
            </MyListings>
          </Dropdown.Item> : false}

          <DropdownDivider/>
          {this.props.session ? <Dropdown.Item> 
            <div className="ui item" onClick={this.logoutHandler.bind(this)}>
            <Icon name="log out"/>Logout</div>
          </Dropdown.Item> : false}

          <Dropdown.Item>
            About Us
          </Dropdown.Item>
        </Dropdown.Menu>
        )
  }

  render() {
    return (
    <Dropdown item icon='bars' className="ui dropdown">
        {this.renderUserDropdown()}
    </Dropdown>
    )
  }
}

export default NavDropdown;