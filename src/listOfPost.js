import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './postyle.css';
const BASE_URL = `https://strangers-things.herokuapp.com/api/2211-FTB-ET-WEB-AM`;

const PostList = (props) => {
  const [ title, setTitle ] = useState('');
  const [ price, setPrice ] = useState('');
  const [ script, setScript ] = useState('');
  const [ ship, setShip ] = useState(false);
  const [ locay, setLocay ] = useState('');
  const [ newMessage, setNewMessage ] = useState('');
  const [ messageId, setMessageId ] = useState('');
 
  const tokenString = (props.isLoggedIn);

  const newPost = async (name, exchange, describe, deliver) => {

    try {
      const response = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenString}`
        },
        body: JSON.stringify({
          post: {
            title: name,
            description: describe,
            price: exchange,
            willDeliver: deliver,
          }
        })
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
  }

  const deletePost = async (post_Id) => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${post_Id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenString}`
        }
      });
      const result = await response.json();
      console.log(result);
      window.location.replace('/');
      return result
    } catch (err) {
      console.error(err);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    newPost(title, price, script, ship, locay);
    console.log(title, price, script, ship, locay);
  }

  const onChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    if (name === "name") {
      setTitle(value);
    } else if (name === "description") {
      setScript(value);
    } else if (name === "price") {
      setPrice(value);
    } else if (name === "location") {
      setLocay(value);
    } else if (e.target.value) {
      setShip(true);
    }
    console.log(title, price, locay, ship, script)
  }

  const messageChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    const id = e.target.id;
    
    if (name === 'message') {
      setNewMessage(value);
      setMessageId(id);
    }
    console.log(newMessage);
  }

  const messageSubmit = (e) => {
    e.preventDefault();

    sendMessage(newMessage, messageId);
    console.log(newMessage, messageId);
  }

  const sendMessage = async (message, post_ID) => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${post_ID}/messages`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenString}`
        },
        body: JSON.stringify({
          message: {
            content: message
          }
        })
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
  }

    return (
      <div id="postbox">
        {
          props.isLoggedIn ?
          <form id="newpost" onSubmit={handleSubmit}>
            <h3 id="newposttitle">New Post</h3>
            <input onChange={onChange} class="postfields" type="text" placeholder="Item Name" name="name" required></input>
            <input onChange={onChange} class="postfields" type="text" placeholder="Location" name="location" required></input>
            <input  onChange={onChange} class="postfields" type="text" placeholder="Price" name="price" required></input>
            <textarea onChange={onChange} id="descript" class="postfields" type="text" placeholder="Description" name="description"></textarea>
            <label>Will Deliver?</label><input onChange={onChange} class="postfields" type="checkbox" name="deliver"></input>
            <button id="submit" type="submit">Post Item</button>
          </form> : null
        }
        {
            props.allPosts.map((singlePost, index) => {
              return (
               props.isLoggedIn ?
                singlePost.author._id != props.myId ?
                 <div class="post" key={index}>
                    <h3 class="title">{singlePost.title}</h3>
                    <h5 class="smallinfo">Uploaded By: {singlePost.author.username} | Location: {singlePost.location}</h5>
                    {
                    singlePost.willDeliver ?
                    <h5 class="smallinfo">Will Deliver</h5> :
                    <h5 class="smallinfo">No Delivery</h5>
                    }
                    <h5 class="ID">ID#: {singlePost._id}</h5>
                    <h4 class="price">{singlePost.price}</h4>
                    <p class="descript">{singlePost.description}</p>
                    <form id="newmessage" onSubmit={messageSubmit}>
                      <textarea class="messageauthor" id={singlePost._id} type="text" name="message" placeholder="New Messages..." onChange={messageChange}></textarea>
                      <button class="send" type="submit">Send</button>
                    </form>
                  </div> : null 
                  :
                  <div class="post" key={index}>
                    <h3 class="title">{singlePost.title}</h3>
                    <h5 class="smallinfo">Uploaded By: {singlePost.author.username} | Location: {singlePost.location}</h5>
                    {
                    singlePost.willDeliver ?
                    <h5 class="smallinfo">Will Deliver</h5> :
                    <h5 class="smallinfo">No Delivery</h5>
                    }
                    <h5 class="ID">ID#: {singlePost._id}</h5>
                    <h4 class="price">{singlePost.price}</h4>
                    <p class="descript">{singlePost.description}</p>
                  </div>                
              )
            }) 
        }
        {
          props.myPosts ?
           props.myPosts.map((myPost, index) => {
            return (
             props.isLoggedIn ?
             myPost.active ?
              <div class="post" key={index}>
                <h3 class="title">{myPost.title}</h3>
                <h5 class="smallinfo">Uploaded By: {myPost.author.username} | Location: {myPost.location}</h5>
                {
                myPost.willDeliver ?
                <h5 class="smallinfo">Will Deliver</h5> :
                <h5 class="smallinfo">No Delivery</h5>
                }
                <h5 class="ID">ID#: {myPost._id}</h5>
                <h4 class="price">{myPost.price}</h4>
                <p class="descript">{myPost.description}</p>
                <button onClick={() => {deletePost(myPost._id)}} class="delete">Delete</button><Link to="/messages" id="mypostmessages">Messages: {myPost.messages.length}</Link>
              </div> : null
              : null          
            )
          }) : 
          <p style="color:white">Loading some posts</p>
        }  
      </div>
    )
}

export default PostList;