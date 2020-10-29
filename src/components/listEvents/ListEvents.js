import React, { useState, useEffect } from "react";
import Header from "../header/Header";
import Event from "../event/Event";
import SearchEvent from "../searchEvent/SearchEvent";
import "./ListEvents.scss";
import Footer from "../footer/Footer";
import Error from "../error/Error";
import { getArtist } from "../../logic/EventLogic";

const ListEvents = () => {
  const [eventList, setEventList] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const fetchArtist = async () => {
      const artist = await getArtist(keyword);
      if (artist == null) {
        console.log("Artist not avaible");
      }
      setEventList(artist);
    };

    fetchArtist();
  }, [keyword]);

  return (
    <div className="wrapper">
      <Header />
      <SearchEvent setKeyword={setKeyword} />
      <div className="container row">
        {eventList ? (
          <div className="list-events">
            {eventList.map((event) => (
              <div className="event-item" key={event.id}>
                <Event event={event} />
              </div>
            ))}
          </div>
        ) : (
          <Error />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ListEvents;
