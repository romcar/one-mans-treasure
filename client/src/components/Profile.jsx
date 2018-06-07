import React from 'react';
import ReactDom from 'react-dom';
import { Button, Header, Icon, Divider,
   Container, Modal, Input, Form, TextArea } from 'semantic-ui-react'




             // Welcome back {this.props.session.user.username}!


class Profile extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      userInfo : {
        Username: '',
        First_Name: '',
        Last_Name: '',
        Password: '',
      },
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
    const listing = this.state.listing;
    listing[key] = event.target.value;
    this.setState({listing: listing});
  }

  submit(){
    console.log('submit!');
  }

  render(){
    return(
    <Modal open={this.state.isOpen} trigger={<div className="ui item" onClick={this.open.bind(this)}>
        <Icon name='user' />
        Welcome back {this.props.user}!</div>} basic closeOnDimmerClick={false}>
      <Modal.Header>Your Profile</Modal.Header>
      <Divider/>
      <Container textAlign="center">
      <Input onChange={this.handleChange.bind(this, 'title')} value={this.state.listing.title} placeholder="Username"/><Button secondary type="button">
          <Icon name='edit'/>Edit
        </Button>
      <Divider/>
      <Input onChange={this.handleChange.bind(this, 'loc')} value={this.state.listing.loc} placeholder="First Name"/><Button secondary type="button">
          <Icon name='edit'/>Edit
        </Button>
      <Divider/>
      <Input onChange={this.handleChange.bind(this, 'loc')} value={this.state.listing.loc} placeholder="Last Name"/><Button secondary type="button">
          <Icon name='edit'/>Edit
        </Button>
      <Divider/>
      <Input onChange={this.handleChange.bind(this, 'loc')} value={this.state.listing.loc} placeholder="Password"/><Button secondary type="button">
          <Icon name='edit'/>Edit
        </Button>
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