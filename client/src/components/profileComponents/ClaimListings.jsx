import React from 'react';
import { Button, Header, Icon, Modal, List } from 'semantic-ui-react'
import ClaimListingEntry from './ClaimListingEntry.jsx';

class ClaimListings extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
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
    console.log(this.props.listings, 'listings')
    console.log(this.props.claimed, 'claimed')
    return (
      <Modal
        open={this.state.isOpen}
        trigger={<div className="ui item" onClick={this.open.bind(this)}>
        <Icon name='list alternate outline'/>
        Claim Listings</div>} basic size='small'>
        <Header icon='browser' content='Claim Listings' />
        <Modal.Content>
          {
            this.props.claimed.map(entry =>
              entry.listedBy === this.props.user._id ?
              <List divided verticalAlign='middle' key={entry._id}>
                <ClaimListingEntry listing={entry}
                listingSelectHandler={this.props.listingSelectHandler.bind(this)} close={this.close.bind(this)} claimed={this.props.claimed}/>
              </List> : false
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

export default ClaimListings;