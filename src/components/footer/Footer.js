import React from "react";
import { useHistory, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome,faThumbsUp, faSearch } from "@fortawesome/free-solid-svg-icons";
import '../../styles/Footer.scss';


const Footer = () => {


  return (
<footer className="footer">
   <Link  to="/home">
      <FontAwesomeIcon icon={faHome} className="logo-footer" />
   </Link>
   <Link  to="/profile">
      <FontAwesomeIcon icon={faSearch} className="logo-footer" />
    </Link>
    <Link to="/myevents">
      <FontAwesomeIcon icon={faThumbsUp}  className="logo-footer"/>
    </Link>
</footer>
  );
};

export default Footer;

   