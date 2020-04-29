import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { signout } from '../../logic/User';
import './Header.scss';

const Header = () => {
    const user = useSelector(state => state.user)
    const history = useHistory();

    const handleSignOut = ()=>{
       history.push('/');
    }


    return (
        <header className="container row">
          <h1>event connect</h1>
          <Link to = {'/profile'} className ="user-logo" >
          <FontAwesomeIcon icon={faUser} />
          </Link>
          <FontAwesomeIcon className ="user-logo" icon={faPowerOff}  onClick={handleSignOut}/>
        </header>
     );
}

export default Header;