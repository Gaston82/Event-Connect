import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './Header.scss';

const Header = () => {
    const user = useSelector(state => state.user)
    const history = useHistory();


    return (
        <header className="container row">
          <h1>event connect</h1>
          <Link to = {'/profile'} className ="user-logo" >
          <FontAwesomeIcon icon={faUser} />
          </Link>
        </header>
     );
}

export default Header;