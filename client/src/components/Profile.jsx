import React from 'react';
import { Button, Header, Icon, Divider,
   Container, Modal, Input, Form, TextArea, Message } from 'semantic-ui-react'
import { updateUserService } from '../services/userService.js'

class Profile extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      userInfo : {
        UserId: this.props.user._id,
        Username: this.props.user.username,
        Password: this.props.user.password,
        OriginalPw: this.props.user.password
      },
      usernameEdit: false,
      passwordEdit: false,
      isOpen: false
    }
    const inputStyle={
      width: `0.1px`,
      height: `0.1px`,
      opacity: 0,
      overflow: "hidden",
      position: "absolute",
      "z-index": "-1"
    }
    const labelStyle={
      "white-space": "nowrap"
    }
  }

  open(){
    this.setState({
      isOpen:true
    })
  }

  close(){
    this.setState({
      isOpen:false
    })
  }

  handleChange(key, event){
    const user = this.state.userInfo
    user[key] = event.target.value;
    this.setState({user});
  }

  makeUsernameEditable(){
    this.setState({
      usernameEdit: !this.state.usernameEdit
    })
  }

  makePasswordEditable(){
    this.setState({
      passwordEdit: !this.state.passwordEdit
    })
  }

  renderUsernameForm(){
    if (this.state.usernameEdit === true) {
      return (
      <span>
        <Input onChange={this.handleChange.bind(this, 'Username')} placeholder="Username"/>
        <Button primary type="button" onClick={this.makeUsernameEditable.bind(this)}><Icon className='right chevron'/>Done</Button>
      </span>
      )
    } else {
      return (
        <span>
          <span>&nbsp;{this.state.userInfo.Username}</span>
          <Button secondary type="button" onClick={this.makeUsernameEditable.bind(this)}><Icon className='edit'/>Edit</Button>
        </span>
      )
    }
  }

  renderPasswordForm() {
    if (this.state.passwordEdit === true) {
      return (
      <span>
        <Input onChange={this.handleChange.bind(this, 'Password')} placeholder="Password"/>
        <Button primary type="button" onClick={this.makePasswordEditable.bind(this)}><Icon className='right chevron'/> Done</Button>
      </span>
      )
    } else {
      return (
        <span>
          <Button secondary type="button" onClick={this.makePasswordEditable.bind(this)}><Icon className='edit'/> Edit</Button>
        </span>
      )
    }
  }

  renderGeneralInfo() {
    return (
      <span>
        <h3 className="ui">General</h3>
        <div textalign="center">Created: {(new Date(this.props.user.created_at)).toLocaleDateString('en-US')}</div>
        <Divider/>
        <div textalign="center">Admin Rights: {this.props.user.isAdmin ? 'Yes' : 'No'}</div>
        <Divider/>
        <div textalign="center">Karma: {this.props.user.karma}</div>
      </span>
    );
  }

  renderUserComments() {
    return (
      <div>
        <h3 className="ui">Current Listings</h3>
        {
          this.props.user.my_listings.map((listing) => {
            return (
              <Message key={ listing._id } className={ listing.isAvailable ? 'positive' : 'negative' }>
                <Header>
                  { listing.title }
                </Header>
                <Divider />
                <span>
                  { listing.description }
                </span>
              </Message>
            );
          })
        }
      </div>
    );
  }

  submit(){
    updateUserService(this.state.userInfo);
    this.close();
  }

  render(){
    return (
      <Modal open={this.state.isOpen} trigger={<div className="ui item" onClick={this.open.bind(this)}><Icon className='edit outline' />
        Your Profile</div>} basic closeOnDimmerClick={false}>
        <Modal.Header>Your Profile</Modal.Header>
        <Divider/>
        <Container textalign="center"> {this.renderGeneralInfo()}
        </Container>
        <Divider />
        <Container textalign="center"> Username {this.renderUsernameForm()}
          <Divider/>
          <div textalign="center"> Password {this.renderPasswordForm()}</div>
        </Container>
        <Divider />
        <Container textalign="center"> {this.renderUserComments()}
        </Container>
        <Divider />
        <Modal.Actions>
          <Button type="button" onClick={this.close.bind(this)} basic color='red'>
            <Icon className='remove'/>Cancel
          </Button>
          <Button primary type="button" onClick={this.submit.bind(this)} basic color='green'>
            <Icon className='check'/>Done
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default Profile;