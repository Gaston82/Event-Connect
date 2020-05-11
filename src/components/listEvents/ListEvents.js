import React, { useState, useEffect } from "react";
import Header from "../header/Header";
import Event from "../event/Event";
import SearchEvent from "../searchEvent/SearchEvent";
import "./ListEvents.scss";
import Footer from "../footer/Footer";
import { getArtist, getEventsByCategory } from "../../logic/EventLogic";
import EventCategory from "../eventCategory/EventCategory";

const ListEvents = () => {
  const [eventList, setEventList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchArtist = async () => {
      const artist = await getArtist(keyword);
      setEventList(artist);
    };

    fetchArtist();
  }, [keyword]);

  return (
    <>
      {category.length <= 0 ? (
        <>
          <Header />
          <SearchEvent setKeyword={setKeyword} />
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
      ) : (
        <EventCategory setCategory={setCategory} />
      )}
    </>
  );
};

export default ListEvents;
