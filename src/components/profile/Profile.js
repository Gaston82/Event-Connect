import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './Profile.scss'

const Profile = () => {
    return ( 
        <div className="user-logo">
         <Link to="/profile">
         <FontAwesomeIcon icon={faUser}/>
         </Link>
        </div>
     );
}
 
export default Profile;