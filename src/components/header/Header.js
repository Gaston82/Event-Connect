import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { signout } from '../../logic/User';
import './Header.scss';

const Header = () => {
    const user = useSelector(state => state.user)
    const history = useHistory();

    console.log("header->user",user)
    return (
        <header>
            <h1>event connect</h1>
            
        </header>
     );
}
 
export default Header;