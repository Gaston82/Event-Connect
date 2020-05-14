import React from "react";
import "./eventCategory.scss";
import { Link } from "react-router-dom";

const EventCategory = () => {
  return (
    <div className="home-container">
      <div className="box">
        <Link to={`/music`}>
          <img src="conciertos-.jpg" alt="" name="music" />
          <h1 className="box__text">Music</h1>
        </Link>
      </div>
      <div className="box">
        <Link to={`/sports`}>
          <img src="deportes.jpg" alt="" name="sports" />
          <h1 className="box__text">Sports</h1>
        </Link>
      </div>
      <div className="box">
        <Link to={`/family`}>
          <img src="familia.jpg" alt="" name="family" />
          <h1 className="box__text">Family</h1>
        </Link>
      </div>
      <div className="box">
        <Link to={`/theater`}>
          <img src="teatro-image.jpg" alt="" name="theater" />
          <h1 className="box__text">Theater</h1>
        </Link>
      </div>
    </div>
  );
};

export default EventCategory;
