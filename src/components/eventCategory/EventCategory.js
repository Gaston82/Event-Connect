import React, { useState, useEffect } from "react";
import "./eventCategory.scss";
import { getEventsByCategory } from "../../logic/EventLogic";

const EventCategory = ({ setCategory }) => {
  const [imageValue, setImageValue] = useState("");
  const [eventList, setEventList] = useState("");

  const handleImg = (e) => {
    setImageValue(e.target.name);
    //setCategory(imageValue);
  };

  useEffect(() => {
    const fetchCategory = async () => {
      const clasification = await getEventsByCategory(imageValue);
      setEventList(clasification);
    };
    if (imageValue) {
      fetchCategory();
    }
  }, [imageValue]);

  return (
    <form className="home-container">
      <div className="box">
        <img src="conciertos-.jpg" alt="" name="music" onClick={handleImg} />
        <h1 className="box__text">Music</h1>
      </div>
      <div className="box">
        <img src="deportes.jpg" alt="" name="sports" onClick={handleImg} />
        <h1 className="box__text">Sports</h1>
      </div>
      <div className="box">
        <img src="familia.jpg" alt="" name="family" onClick={handleImg} />
        <h1 className="box__text">Family</h1>
      </div>
      <div className="box">
        <img src="teatro-image.jpg" alt="" name="theater" onClick={handleImg} />
        <h1 className="box__text">Theater</h1>
      </div>
    </form>
  );
};

export default EventCategory;
