import React, { useEffect, useState } from "react";
import { getEventsByCategory } from "../../logic/EventLogic";
import Event from "../../components/event/Event";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Music = () => {
  const [eventList, setEventList] = useState();

  useEffect(() => {
    const fetchCategory = async () => {
      const clasification = await getEventsByCategory("music");
      setEventList(clasification);
    };
    fetchCategory();
  }, []);

  if (!eventList) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <header className="my-events__header">
        <Link to={"/eventcategory"} className="my-events__header__logo">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <h3 className="my-events__header__title">Music ({eventList.length})</h3>
      </header>
      <div className="container row">
        <div className="list-events">
          {eventList.map((event) => (
            <div className="event-item" key={event.id}>
              <Event event={event} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Music;
