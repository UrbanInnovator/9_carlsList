import React from 'react';
import './postyle.css';

const PostList = (props) => {
  const newPost = () => {}

    return (
      <div id="postbox">
        {
          props.isLoggedIn ?
          <form id="newpost">
            <h3 id="newposttitle">New Post</h3>
            <input class="postfields" type="text" placeholder="Item Name" name="name" required></input>
            <input class="postfields" type="text" placeholder="Location" name="location" required></input>
            <input class="postfields" type="number" placeholder="Price" name="price" required></input>
            <textarea id="descript" class="postfields" type="text" placeholder="Description" name="description"></textarea>
            <label>Will Deliver?</label><input class="postfields" type="checkbox" name="deliver"></input>
            <button id="submit" type="submit">Post Item</button>
          </form> : null
        }
        {
          props.allPosts ?
            props.allPosts.map((singlePost, index) => {
              return (
                <div class="post" key={index}>
                  <h3 class="title">{singlePost.title}</h3>
                  <h5 class="smallinfo">Uploaded By: {singlePost.author.username} | Location: {singlePost.location}</h5>
                  <h5 class="smallinfo">Will Deliver?: {singlePost.willDeliver}</h5>
                  <h5 class="ID">ID#: {singlePost.author._id}</h5>
                  <h4 class="price">{singlePost.price}</h4>
                  <p class="descript">{singlePost.description}</p>
                </div>
              )
            }) :
            <h3 id="load">Loading Post...</h3>
        }   
      </div>
    )
}

export default PostList;