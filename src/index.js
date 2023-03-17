import React, { useEffect, useState} from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './Header.js';
import PostList from './listOfPost.js';
import Login from './Login.js';
import './page.css';
 
const App = () => {
    const [ allPosts, setPosts ] = useState([]);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    // dont forget to change to work with returned token
    
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
      <>
        <Header isLoggedIn={isLoggedIn}/>
        <Routes>
          <Route path='/' element={<PostList isLoggedIn={isLoggedIn} allPosts={allPosts}/>}></Route>
          <Route path='/login' element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}></Route>
        </Routes>   
      </>
    )
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);