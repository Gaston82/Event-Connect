import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './User.scss'

const User = () => {
    return ( 
        <div className="user-logo">
           <FontAwesomeIcon icon={faUser}/> 
        </div>
     );
}
 
export default User;