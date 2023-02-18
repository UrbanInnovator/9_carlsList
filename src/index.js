import React, { useEffect, useState} from 'react';
import { createRoot } from 'react-dom/client';
import './postyle.css'
 
const App = () => {
    const [ allPosts, setPosts ] = useState([]);
    
    useEffect(() => {
        const getPosts = async () => {
            const response = await fetch('https://strangers-things.herokuapp.com/api/2211-FTB-ET-WEB-AM/posts');
            const data = await response.json();
            setPosts(data.data.posts);
            console.log(data.data.posts);
        }
        getPosts();
    }, []) 
    

    return (
      <div id="postbox">
        {
          allPosts ?
            allPosts.map((singlePost, index) => {
              return (
                <div class="post" key={index}>
                  <h3 class="title">{singlePost.title}</h3>
                  <h5 class="smallinfo">Uploaded By: {singlePost.author.username} | Location: {singlePost.location}</h5>
                  <h5 class="ID">ID#: {singlePost.author._id}</h5>
                  <h4 class="price">{singlePost.price}</h4>
                  <p class="descript">{singlePost.description}</p>
                </div>
              )
            }) : 
            <h3>Loading Post...</h3>
        }
      </div>
    )
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);