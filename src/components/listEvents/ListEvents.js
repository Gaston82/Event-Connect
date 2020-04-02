import React, { useState, useEffect } from "react";
import Header from "../header/Header";
import axios from "axios";
import Event from '../event/Event';
import SearchEvent from "../searchEvent/SearchEvent";

const ListEvents = () => {
  const [eventList, setEventList] = useState([]);
  const [keyword, setKeyword] = useState('');

 
  useEffect(() => {
    if(keyword){
      getArtist(keyword);
    }
  }, [keyword]);




  const getArtist = async (keyword) => {
    const apikey = `DxSOpYSZ4nVwPWsGOWdELH14DJA5EIYL`;
    const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apikey}&countryCode=ES&keyword=${keyword}`;
    const response = await axios(url);
    console.log(response);
    
    setEventList(response.data._embedded.events)
  }
 

  const getEvents = async () => {
    const apikey = `DxSOpYSZ4nVwPWsGOWdELH14DJA5EIYL`;
    const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apikey}&countryCode=ES`;
    const response = await axios(url);
    setEventList(response.data._embedded.events);
  };

  useEffect(() => {
    if(!keyword)
    getEvents();
    
  }, [eventList]);



  return(
      <>
      <div className="header">
        <Header />
        <SearchEvent 
        setKeyword={setKeyword}
        />
      </div>
      {eventList.map((event) =>(
          <Event 
          key={event.id}
          event={event}
          />
      ))}

  )
     </>
  )};

export default ListEvents;
