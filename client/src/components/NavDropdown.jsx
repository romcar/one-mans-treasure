import React, { Component } from 'react'
import ReactDom from 'react-dom';
import { Button, Dropdown, Menu, Divider, Segment, Icon, DropdownDivider } from 'semantic-ui-react'
import ListingCreator from './ListingCreator.jsx';
import MyListings from './profileComponents/MyListings.jsx';
import {createListingService} from '../services/listingService.js';
import ClaimListings from './profileComponents/ClaimListings.jsx';
import Profile from './Profile.jsx';

class NavDropdown extends Component {
  constructor(props){
    super(props);
  }

  handleItemClick(e, { name }){
    this.setState({ activeItem: name })
  }

  logoutHandler(){
    this.props.logout();
  }

  renderUserDropdown(){
      return (
        <Dropdown.Menu>
          {this.props.session ? <Dropdown.Item>
            <ListingCreator user={this.props.session.user}
              createListing={this.props.createListing.bind(this)}/>
          </Dropdown.Item> : false}

          {this.props.session ? <Dropdown.Item>
            <MyListings listings={this.props.listings}
            user={this.props.session.user}
            listingSelectHandler={this.props.listingSelectHandler.bind(this)}
            delete={this.props.delete.bind(this)} giveHandler={this.props.giveHandler.bind(this)}>
            </MyListings>
          </Dropdown.Item> : false}

          {this.props.session ? <Dropdown.Item>
            <ClaimListings listings={this.props.listings} claimed={this.props.session.user.claimed}
            user={this.props.session.user}
            listingSelectHandler={this.props.listingSelectHandler.bind(this)}>
            </ClaimListings>
          </Dropdown.Item> : false}

          {this.props.session ? <Dropdown.Item>
            <Profile
            user={this.props.session.user.username}
            userId={this.props.session.user._id}
            password={this.props.session.user.password}
            />
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
    <Dropdown text='MENU' item icon='bars' className="ui dropdown">
        {this.renderUserDropdown()}
    </Dropdown>
    )
  }
}

export default NavDropdown;