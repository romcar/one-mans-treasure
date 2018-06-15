import React from 'react';

class Comments extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    }
  }

  handleCommentSubmit() {
    // send message to server
  }

  render() {
    return (
      <div class="ui comments">
        <h3 class="ui dividing header">Comments</h3>

        <div class="comment">
          <a class="avatar">
            <img src="/images/avatar/small/matt.jpg" />
          </a>
          <div class="content">
            <a class="author">Matt</a>
            <div class="metadata">
              <span class="date">Today at 5:42PM</span>
            </div>
            <div class="text">
              How artistic!
            </div>
            <div class="actions">
              <a class="reply">Reply</a>
            </div>
          </div>
        </div>

        <form class="ui reply form">
          <div class="field">
            <textarea></textarea>
          </div>
          <div 
            class="ui blue labeled submit icon button" 
            onClick={this.handleCommentSubmit}>
            <i class="icon edit"></i> Add Reply
          </div>
        </form>
      </div>
    )
  }
}

export default Comments;