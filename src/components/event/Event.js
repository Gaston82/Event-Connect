import React from "react";
import "./Event.scss";
import { Link } from "react-router-dom";

const Event = ({ event }) => {
  const { name, id } = event;

  return (
    <>
      <Link to={`/detail/${id}`}>
        <img src={event.images[1].url} alt=""></img>
      </Link>
      <h5>{name}</h5>
    </>
  );
};

export default Event;
