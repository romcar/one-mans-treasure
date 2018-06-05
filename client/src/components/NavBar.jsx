import React from 'react';
import ReactDom from 'react-dom';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import NavDropdown from './NavDropdown.jsx';
import {Button, Dropdown} from 'semantic-ui-react';

class NavBar extends React.Component{
  constructor(props){
    super(props);
  }

  renderCredential(){
    if(this.props.session === null){
      return (
      <Button.Group>
        <Login login={this.props.login.bind(this)}/>
      <Button.Or/>
        <Signup create={this.props.create.bind(this)}/>
      </Button.Group>
      )
    } else {
      return <div>Welcome back {this.props.session.user.username}!</div>
    }
  }

  render(){
    return(
      <div className="ui menu">
        <div className="item">
          <div className="ui action left icon input">
            <i className="search icon"></i>
            <input type="type" placeholder="Search"/>
            <button className="ui button">Submit</button>
          </div>
        </div>
        <div className="right menu">
          <div className="item ui">
            {this.renderCredential()}
          </div>
            <NavDropdown session={this.props.session}></NavDropdown>
        </div>
      </div>
    )
  }
}

export default NavBar;