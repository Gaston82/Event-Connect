import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { signout } from '../../logic/User'
import './Header.scss';

const Header = () => {
    const user = useSelector(state => state.user)
    const history = useHistory();

    console.log("header->user",user)
    return (
        <header>
            <h1>Event Connect</h1>
            
            <nav>
              <ul>
              <li><Link to="/login">Login</Link></li>
              {user ? (
                  <>
              <li><Link to="/"></Link></li>
              <li><Link to="/detail"></Link></li>
              </>
              ) : (
              <>
              <li><Link to="/signup">SignUp</Link></li>
              </> 
              )
            } 
              </ul>
            </nav>
        </header>
     );
}
 
export default Header;