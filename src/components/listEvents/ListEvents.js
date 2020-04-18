import React, { useState, useEffect } from "react";
import Header from "../header/Header";
import axios from "axios";
import Event from '../event/Event';
import SearchEvent from "../searchEvent/SearchEvent";
import './ListEvents.scss'
import Footer from "../footer/Footer";

const ListEvents = () => {
  const [eventList, setEventList] = useState([]);
  const [keyword, setKeyword] = useState('');


  useEffect(() => {
    const getArtist = async () => {
      const apikey = `DxSOpYSZ4nVwPWsGOWdELH14DJA5EIYL`;
      const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apikey}&countryCode=ES&keyword=${keyword}`;
      const response = await axios(url);

      setEventList(response.data._embedded.events)
    }

    getArtist(keyword);
  }, [keyword]);

  // Esto se necesita? Cuando haces la llamada sin keyword o con la keyword siendo string vacia hace el mismo efecto
  // useEffect(() => {
  //   const getEvents = async () => {
  //     const apikey = `DxSOpYSZ4nVwPWsGOWdELH14DJA5EIYL`;
  //     const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apikey}&countryCode=ES`;
  //     const response = await axios(url);
  //     console.log(response.data._embedded.events);

  //     setEventList(response.data._embedded.events);
  //   };

  //   getEvents();

  // }, []);
;

  return(
    <>
      <Header/>
      <SearchEvent
      setKeyword={setKeyword}
      />
     <div className="contenedor-listEvents">
        {eventList.map((event) => (
        <div className="event-item" key={event.id}>
                <Event event={event}/>
                </div>
            ))}
    </div>
    <Footer />
    </>
  )};

export default ListEvents;
