import React from 'react';
import ReactDom from 'react-dom';
import { Button, Header, Icon, Modal, List } from 'semantic-ui-react'
import MyListingEntry from './MyListingEntry.jsx';

class MyListings extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      isOpen: false 
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

  render() {
    return (
      <Modal
        open={this.state.isOpen} 
        trigger={<div className="ui item" onClick={this.open.bind(this)}>
        <Icon name='list alternate outline'/>
        My Listings</div>} basic size='small'>
        <Header icon='browser' content='My Listings' />
        <Modal.Content>
          {
            this.props.listings.map(entry =>
              <List divided verticalAlign='middle' key={entry._id}>
                <MyListingEntry listing={entry} />
              </List>
            )
          }
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={this.close.bind(this)} inverted>
            <Icon name='checkmark' /> Got it
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default MyListings;
