import React from 'react';
import ReactDom from 'react-dom';
import { Button, Header, Icon, Divider,
   Container, Modal, Input, Form, TextArea } from 'semantic-ui-react'

class Profile extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      userInfo : {
        Username: this.props.user,
        Password: ''
      },
      usernameEdit: false,
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

  makeUsernameEditabel(){
    this.setState({
      usernameEdit: !this.state.usernameEdit
    })
  }

  renderUsernameForm(){
    if (this.state.usernameEdit === true) {
      return (
      <span>
        <Input onChange={this.handleChange.bind(this, 'Username')} placeholder="Username"/>
        <Button primary type="button" onClick={this.makeUsernameEditabel.bind(this)}><Icon name='right chevron'/>Done</Button>
      </span>
      )
    } else {
      return (
      <span>
        <span>&nbsp;{this.state.userInfo.Username}</span>
        <Button secondary type="button" onClick={this.makeUsernameEditabel.bind(this)}><Icon name='edit'/>Edit</Button>
      </span>
      )
    }
  }

  submit(){
    console.log(this.props.user, 'submit!');
  }

  render(){
    return(
    <Modal open={this.state.isOpen} trigger={<div className="ui item" onClick={this.open.bind(this)}>
        <Icon name='user' />
        Welcome back {this.props.user}!</div>} basic closeOnDimmerClick={false}>
      <Modal.Header>Your Profile</Modal.Header>
      <Divider/>
      <Container textAlign="center"> Username {this.renderUsernameForm()}
      <Divider/>
      <Button secondary type="button"><Icon name='edit'/>Edit</Button>
      </Container>
      <Divider/>
      <Modal.Actions>
        <Button type="button" onClick={this.close.bind(this)} basic color='red'>
          <Icon name='remove'/>Cancel
        </Button>
        <Button primary type="button" onClick={this.submit.bind(this)} basic color='green'>
          <Icon name='check'/>Done
        </Button>
      </Modal.Actions>
    </Modal>
    )
  }
}

export default Profile