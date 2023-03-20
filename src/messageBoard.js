import React, { useState, useEffect } from 'react';
import './messages.css';
const BASE_URL = `https://strangers-things.herokuapp.com/api/2211-FTB-ET-WEB-AM`;

const Messages = (props) => {
  const [ messages, setMessages ] = useState([]);

  useEffect(() => {
    const myData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users/me`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${props.isLoggedIn}`
          },
        });
        const result = await response.json();
        setMessages(result.data.messages);
        console.log(result.data.messages, messages);
        return result
      } catch (err) {
        console.error(err);
      }
    }  
    myData();  
  }, [])

  return (
    <div>
      {
        props.isLoggedIn ?
        <div id="mailbox">
          <h1 id="title">Mailbox</h1>
          {
           messages.map((message, index) => {
            return (
              <div class="message" key={index}>
              {
                message.fromUser._id != props.myId ?
                <h3 class="from">From:{message.fromUser.username} To:{message.post.author.username}</h3>
                : <h3 class="to">To: {message.post.author.username} From: {message.fromUser.username}</h3>
              }
                <p class="messagecontent">{message.content}</p>
                <p class="postId">Post ID#: {message.post._id}</p>
              </div>
            )
           })
          }
        </div>
        : null
      }     
    </div>
  )
}

export default Messages;