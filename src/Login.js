import React, { useState } from 'react';
import './login.css';
const BASE_URL = `https://strangers-things.herokuapp.com/api/2211-FTB-ET-WEB-AM`

const Login = (props) => {
  const [ showLoginButton, setShowLoginButton ] = useState(true);
  const [ userN, setUserN ] = useState('');
  const [ passW, setPassW ] = useState('');

  const logIn  = async(user, pass) => {
    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'aplication/json'
        },
        body: JSON.stringify({
          user: {
            username: user,
            password: pass
          }
        })
      });
      const result = await response.json();
      setIs
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  const registerUser = async (user, pass) => {
    try {
      const response = await fetch(
        `${BASE_URL}/users/register`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            username: user,
            password: pass
          }
        })
      });
      const result = await response.json();
      console.log(result)
      return result
    } catch (err) {
      console.error(err);
    }
  };

  // const onChange = (event) => {
  //   const name = event.target.name;
  //   const value = event.target.value;

  //   if(name === 'username') {
  //     setUserN(value);
  //   } else if (name === 'password') {
  //     setPassW(value);
  //   };
  //   console.log(userN, passW);
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const username = form[0].value;
    const password = form[1].value;
    
    if(form[3].name === "register") {
      const passConf = form[2].value;
      if(passConf === password) {
        setUserN(username);
        setPassW(password);
        registerUser(userN, passW);
        console.log(passConf, userN, passW, username, password);
      } else {
        console.log("Passwords do not match");
      }
    } else {
      setUserN(`${username}`);
      setPassW(`${password}`);
      logIn(userN, passW);
      props.setIsLoggedIn(true); 
      // Will have to edit all instances of setLoggedIn to work with token
      // this is only here to test while API is down
      console.log(username, password, userN, passW, props.isLoggedIn);
    }
  };

  return (
    <div id="logpage">
      {
        props.isLoggedIn ? <p id="logmessage">You're logged in man!</p> : null
      }
      <form onSubmit={handleSubmit}>
        <input id="user" class="userpass" type="text" placeholder="Enter Username" min="5" maxlength="15" name="username" required></input>
        <input id="pass" class="userpass" type="password" placeholder="Enter Password" min="8" maxlength="20" name="password" required></input>
        {
          showLoginButton ? 
            <>
              <button class="logreg" name="login">Login</button>
              <button class="sublog" onClick={() => setShowLoginButton(false)}>Not Registered? Click Here!</button>
            </> : 
            <>
              <input class="userpass" type="text" placeholder="Confirm Password" name="Confirm Password"></input>
              <button class="logreg" name="register">Register</button>
              <button class="sublog" onClick={() => setShowLoginButton(true)}>Already Registered? Login Here!</button>
            </>
        }
      </form>
    </div>
  )  
}

export default Login;