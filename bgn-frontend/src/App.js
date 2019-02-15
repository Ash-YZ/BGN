import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.png';
import close from './close.png';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };

    this.updateMessages = this.updateMessages.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
  }

  componentWillMount() {
    axios.get('http://localhost:8080/api/messages')
    .then((messages) => {
      this.setState({messages: messages.data.data.reverse()});
    });
  }

  updateMessages (message) {
    this.setState((prevState, props) => {
      return {
        messages: [message, ...prevState.messages]
      }
    });
  }

  deleteMessage (messageId) {
    return () => {
      axios.delete(`http://localhost:8080/api/messages/${messageId}`)
      .then(() => {
        this.setState((prevState, props) => {
          return {
            messages: prevState.messages.filter(m => m._id !== messageId)
          }
        });
      });
    }
  }

  render() {
    return (
      <div className="app-container">
        <Header title="BGN Messaging App"/>
        <div className="app-messaging-container">
          <div className="app-messaging-left">
            <AddMessage update={this.updateMessages}/>
          </div>
          <div className="app-messaging-right">
            <MessageItems messages={this.state.messages}
            delete={this.deleteMessage}/>
          </div>
        </div>
      </div>
    );
  }
}

const Header = (props) => (
  <header className="app-header">
    <img src={logo} className="app-logo" alt="logo" />
    <h1>{props.title}</h1>
  </header>
);

const MessageItems = (props) => (
  <div className="app-messages-wrapper">
    <div className="app-messages-body ">
      {props.messages.map((message, index) =>
        <MessageItem message={message}
        delete={props.delete}
        key={'bng-mess-' + index}/>)}
    </div>
  </div>
);

const MessageItem = (props) => (
  <div className="app-message-item">
    <img src={close} className="app-message-item-delete" alt="Delete"
         onClick={props.delete(props.message._id)}/>
    <p className="app-message-item-content">{props.message.content}</p>
    <p className="app-message-item-info">{props.message.timestamp}</p>
    <div className="app-message-item-tags">
      {props.message.tags.map((tag, index) =>
      <p className="app-message-item-tag"
      key={'bng-tag-' + index}>{tag}</p>)}
    </div>
  </div>
);

class AddMessage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: {
        content: "",
        tags: []
      }
    };

    this.addMessageContent = this.addMessageContent.bind(this);
    this.addMessageTags = this.addMessageTags.bind(this);
    this.addMessage = this.addMessage.bind(this);
  }
  
  addMessageContent (ev) {
    const newContent = ev.target.value;
    this.setState((prevState, props) => ({
      message: {
        content: newContent,
        tags: prevState.message.tags
      }
    }));
  }
  
  addMessageTags (ev) {
    const newTags = ev.target.value;
    this.setState((prevState, props) => ({
      message: {
        content: prevState.message.content,
        tags: newTags.split(' ').filter(t => t.trim().length > 0)
      }
    }));
  }
  
  addMessage (ev) {
    ev.preventDefault();
    const props = this.props;
    const newMessage = {
      content: this.state.message.content,
      tags: this.state.message.tags
    }
    axios.post('http://localhost:8080/api/messages', newMessage)
    .then(function (response) {
      props.update(response.data.data)
    })
    .catch(function (error) {
      console.log(error);
      //do something
    });
  }

  render() {
    return (
      <form name="add-message-form" className="app-add-message">
        <h3>Content</h3>
        <textarea className="app-message-add-content"
        onKeyUp={this.addMessageContent}/>
        <h3>Tags</h3>
        <input type="text" className="app-message-add-tags"
        onKeyUp={this.addMessageTags}/>
        <div className="app-message-add-wrapper">
          <button className="app-message-add" 
          onClick={this.addMessage}>Add message</button>
        </div>
      </form>
    );
  }
}
export default App;
