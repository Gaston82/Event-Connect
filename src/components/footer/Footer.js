import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faThumbsUp,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <Link to="/home">
        <FontAwesomeIcon icon={faHome} className="footer__logo" />
      </Link>
      <Link to="/eventcategory">
        <FontAwesomeIcon icon={faSearch} className="footer__logo" />
      </Link>
      <Link to="/myevents">
        <FontAwesomeIcon icon={faThumbsUp} className="footer__logo" />
      </Link>
    </footer>
  );
};

export default Footer;
