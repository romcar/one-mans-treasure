import React from 'react';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import NavDropdown from './NavDropdown.jsx';
import {Button, Dropdown, Menu, Container, Header, Icon} from 'semantic-ui-react';

class NavBar extends React.Component{
  constructor(props){
    super(props);
  }

  renderCredential(){
    if(this.props.session === null){
      return(
      <div className="item ui">
      <Button.Group>
        <Login login={this.props.login.bind(this)}/>
      <Button.Or/>
        <Signup create={this.props.create.bind(this)}/>
      </Button.Group>
      </div>
      )
    } else {
      return(
      <div className="item ui">
        <Icon name='user' />
        Welcome back {this.props.session.user.username}!
      </div>
      )
    }
  }

  render(){
    return(
      <div className="ui menu aligned">
        <div className='item'>
            <Icon onClick={this.props.homeHandler.bind(this)} name='home' size='large'></Icon>
        </div>
        <div className="item">
          <div className="ui action left icon input">
          {/*search bar here*/}
            <form onSubmit={(e) => {e.preventDefault(); console.log(document.getElementsByClassName('search-query')[0].value)}}>
              <i className="search icon"></i>
              <input className="search-query"type="type" placeholder="Search"/>
              <Button color='orange' className="ui button">Submit</Button>
            </form>
          </div>
        </div>
        <Menu.Menu position="right">
            {this.renderCredential()}
          <NavDropdown
          listings={this.props.listings}
          logout={this.props.logout.bind(this)}
          session={this.props.session}
          createListing={this.props.createListing.bind(this)}
          delete={this.props.delete.bind(this)}
          listingSelectHandler={this.props.listingSelectHandler.bind(this)}
          logout={this.props.logout.bind(this)}
          giveHandler={this.props.giveHandler.bind(this)}>
          </NavDropdown>
        </Menu.Menu>
      </div>
    )
  }
}

export default NavBar;