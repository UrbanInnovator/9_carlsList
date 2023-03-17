import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header = (props) => {
    return (
      <header>
        <Link to='/' id="headline">Stranger's Things</Link>
        {
          props.isLoggedIn ?
          <Link to='/messsage' id="messages">Messages</Link> :
          null
        }
        <Link to='/login' id="logline">Login/Register</Link>
      </header>
    )
}

export default Header;