import React, { Component } from 'react'
import ReactDom from 'react-dom';
import { Button, Dropdown, Menu } from 'semantic-ui-react'
import ListingCreator from './ListingCreator.jsx';
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
    createListingService(post, (dataFromServer)=>{
      console.log('success');
    })
  }

  render() {
    const { activeItem } = this.state

    return (
    <Dropdown item icon='bars'>
      <Dropdown.Menu>
        <Dropdown.Item><ListingCreator handleCreate={this.handleListingCreate.bind(this)}/></Dropdown.Item>
        <Dropdown.Item></Dropdown.Item>
        <Dropdown.Item></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    )
  }
}

export default NavDropdown;