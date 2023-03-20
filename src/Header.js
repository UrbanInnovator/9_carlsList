import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header = (props) => {
  const logOut =() => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    window.location.replace('/');
  }
    return (
      <header>
        <Link to='/' id="headline">Stranger's Things</Link>
        {
          props.isLoggedIn ?
          <>
            <Link to='/messages' id="messages">Messages</Link>
            <Link to='/login' id="logline" onClick={logOut}>Logout</Link>
          </> : 
          <Link to='/login' id="logline">Login/Register</Link>
        }
      </header>
    )
}

export default Header;