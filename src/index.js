import React, { useEffect, useState} from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './Header.js';
import PostList from './listOfPost.js';
import Login from './Login.js';
import Messages from './messageBoard.js';
import Me from './user.js';
import './page.css';
 
const App = () => {
    const [ allPosts, setPosts ] = useState([]);
    const [ userN, setUserN ] = useState('');
    const [ passW, setPassW ] = useState('');
    const [ isLoggedIn, setIsLoggedIn ] = useState(window.localStorage.getItem('token'));
    const [ myPosts, setMyPosts ] = useState([]);
    const [myId, setMyId ] = useState(window.localStorage.getItem('userId'));
    // const myId = '6414f0f626629a0016c250c8';
    

    // dont forget to change to work with returned token
    
    useEffect(() => {
        const getPosts = async () => {
          if (!isLoggedIn) {
            const response = await fetch('https://strangers-things.herokuapp.com/api/2211-FTB-ET-WEB-AM/posts');
            const data = await response.json();
            setPosts(data.data.posts);
            console.log(data.data.posts);
          } else if (isLoggedIn) {
            const token = isLoggedIn;
            const response = await fetch(
              'https://strangers-things.herokuapp.com/api/2211-FTB-ET-WEB-AM/posts', {
                headers: {
                  'Content-Type': 'application/json',
                  'Authentication': `Bearer ${token}`
                }
              }
            );
            const data = await response.json();
            setPosts(data.data.posts);
            console.log(data.data.posts, {token});
          };
      };

      const getMyPost = async () => {
        try {
          const token = isLoggedIn;
          const response = await fetch(`https://strangers-things.herokuapp.com/api/2211-FTB-ET-WEB-AM/users/me`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          });
          const result = await response.json();
          setMyPosts(result.data.posts);
          console.log(result);
        } catch (err) {
          console.error(err);
        }
      }
      getMyPost();
      getPosts();
  }, [])  
    

    return (
      <>
        <Header 
        isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path='/' element={<PostList 
          isLoggedIn={isLoggedIn} 
          allPosts={allPosts}  
          myId={myId}
          myPosts={myPosts}/>}></Route>
          <Route path='/login' element={<Login 
          isLoggedIn={isLoggedIn} 
          userN={userN}
          setUserN={setUserN}
          passW={passW}
          setPassW={setPassW} />}></Route>
          <Route path='/messages' element={<Messages 
          isLoggedIn={isLoggedIn}
          myId={myId}/>}></Route>
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