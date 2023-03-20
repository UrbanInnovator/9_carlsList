import React, { useState } from 'react';
import './login.css';
const BASE_URL = `https://strangers-things.herokuapp.com/api/2211-FTB-ET-WEB-AM`;

const Login = (props) => {
  const [ showLoginButton, setShowLoginButton ] = useState(true);

  const getId = async (yourToken) => {
    try {
      const response = await fetch(`${BASE_URL}/users/me`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${yourToken}`
        },
      });
      const result = await response.json();
      window.localStorage.setItem('userId', `${result.data._id}`)
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  }


  const logIn  = async(user, pass) => {
    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',          
        },
        body: JSON.stringify({
          user: {
            username: user,
            password: pass
          }
        })
      });
      const result = await response.json();
      console.log(result.data, props.userN, props.passW);
      window.localStorage.setItem('token', `${result.data.token}`);
      getId(result.data.token);
      window.location.replace('/');
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
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
  };

  const onChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    if(name === 'username') {
      props.setUserN(value);
    } else if (name === 'password') {
      props.setPassW(value);
    }
    // console.log(props.userN, props.passW);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    console.log(form);
    
    if(form[3].name === "register") {
      const passConf = form[2].value;
      if(passConf === props.passW) {
        registerUser(props.userN, props.passW);
        console.log(passConf, props.userN, props.passW);
      } else {
        console.log("Passwords do not match");
      }
    } else if (form[2].name === 'login') {
      logIn(props.userN, props.passW);
      // Will have to edit all instances of setLoggedIn to work with token
      // this is only here to test while API is down
    }
    // console.log(props.isLoggedIn);
  };

  return (
    <div id="logpage">
      {
        props.isLoggedIn ? <p id="logmessage">You're logged in man!</p> : null
      }
      <form onSubmit={handleSubmit}>
        <input id="user" class="userpass" type="text" placeholder="Enter Username" min="5" maxlength="15" name="username" onChange={onChange} required></input>
        <input id="pass" class="userpass" type="password" placeholder="Enter Password" min="8" maxlength="20" name="password" onChange={onChange} required></input>
        {
          showLoginButton ? 
            <>
              <button class="logreg" name="login">Login</button>
              <button class="sublog" onClick={() => setShowLoginButton(false)}>Not Registered? Click Here!</button>
            </> : 
            <>
              <input class="userpass" type="password" placeholder="Confirm Password" name="Confirm Password"></input>
              <button class="logreg" name="register">Register</button>
              <button class="sublog" onClick={() => setShowLoginButton(true)}>Already Registered? Login Here!</button>
            </>
        }
      </form>
    </div>
  )  
}

export default Login;