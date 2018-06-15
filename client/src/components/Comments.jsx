import React from 'react';
import axios from 'axios';

class Comments extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      text: ''
    }
  }

  changeText(e) {
    this.setState({
      text: e.target.value
    });
  }

  handleCommentSubmit() {
    // send message to server
    console.log('This is the text: ', this.state.text);
    axios.post('/api/comments', {
      text: this.state.text
    }).then(results => {
      this.setState({
        text: results.data
      })
    }).catch(err => {
      console.error(err);
    })
    console.log('You have just attempted to submit a comment')

  }

  render() {
    return (
      <div className="ui comments">
        <h3 className="ui dividing header">Comments</h3>

        <div className="comment">
          <a className="avatar">
            <img src="" />
          </a>
          <div className="content">
            <a className="author">Matt</a>
            <div className="metadata">
              <span className="date">Today at 5:42PM</span>
            </div>
            <div className="text">
              How artistic!
            </div>
            <div className="actions">
              <a className="reply">Reply</a>
            </div>
          </div>
        </div>

        <form className="ui reply form">
          <div className="field">
            <textarea onChange={this.changeText.bind(this)}></textarea>
          </div>
          <div 
            className="ui blue labeled submit icon button" 
            onClick={this.handleCommentSubmit.bind(this)}>
            <i className="icon edit"></i> 
            Add Reply
          </div>
        </form>
      </div>
    )
  }
}

export default Comments;