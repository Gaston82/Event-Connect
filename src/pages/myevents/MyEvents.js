import React, { useState, useEffect } from "react";
import { getById } from "../../services/data";
import { useSelector } from "react-redux";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./MyEvents.scss";

const MyEvents = () => {
  const [eventProfile, setEventProfile] = useState([]);
  const user = useSelector((state) => state.user);

  const fetchEvents = async () => {
    const dbMyEvents = await getById("profiles", user.id);
    setEventProfile(dbMyEvents.myEvents);
    console.log("myevents->", dbMyEvents);
  };

  useEffect(() => {
    if (user) {
      fetchEvents();
    }
  }, [user]);

  if (!eventProfile) {
    return <p>loading...</p>;
  }

  return (
    <>
      <header className="my-events__header">
        <Link to={"/home"} className="my-events__header__logo">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <h3 className="my-events__header__title">
          My Events({eventProfile.length})
        </h3>
      </header>
      <div className="my-events__card">
        {eventProfile.map((evento) => (
          <>
            <div className="my-events__card__content">
              <img
                alt=""
                src={evento.event.eventImg}
                className="my-events__card__img"
              />
              <p>{evento.event.eventName}</p>
            </div>
          </>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default MyEvents;
