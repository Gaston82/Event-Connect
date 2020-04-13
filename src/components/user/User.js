import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './User.scss'

const User = () => {
    return ( 
        <div className="user-logo">
         <Link to="/signup">
         <FontAwesomeIcon icon={faUser}/>
         </Link>
    
        </div>
     );
}
 
export default User;