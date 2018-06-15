import React from 'react';
import { Menu } from 'semantic-ui-react';

class SearchEnhancer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      sortType: 'relavance'
    }
  }

  handleSortChange(e, {name}) {
    this.setState({sortType: name});
  }

  render() {
    const {sortType} = this.state;

    return(
      <div>
        <Menu>

          <div>Searching for: {this.props.query}</div>

          <Menu.Item
            name='relavance'
            active={sortType === 'relavance'}
            onClick={this.handleSortChange.bind(this)}>
            Relavance
          </Menu.Item>

          <Menu.Item
            name='claimsDesc'
            active={sortType === 'claimsDesc'}
            onClick={this.handleSortChange.bind(this)}>
            Highest Claims
          </Menu.Item>

          <Menu.Item
            name='claimsAsc'
            active={sortType === 'claimsAsc'}
            onClick={this.handleSortChange.bind(this)}>
            Lowest Claims
          </Menu.Item>

          <Menu.Item
            name='name'
            active={sortType === 'name'}
            onClick={this.handleSortChange.bind(this)}>
            Name
          </Menu.Item>

        </Menu>
      </div>
    ); // end return
  }
}

export default SearchEnhancer;