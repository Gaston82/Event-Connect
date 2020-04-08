import React, { useState, useEffect } from "react";
import Header from "../header/Header";
import axios from "axios";
import Event from '../event/Event';
import SearchEvent from "../searchEvent/SearchEvent";
import User from "../user/User";
import './ListEvents.scss'

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
    
    setEventList(response.data._embedded.events)
  }
 

  const getEvents = async () => {
    const apikey = `DxSOpYSZ4nVwPWsGOWdELH14DJA5EIYL`;
    const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apikey}&countryCode=ES`;
    const response = await axios(url);
    console.log(response.data._embedded.events);
    

    setEventList(response.data._embedded.events);
  };

  useEffect(() => {
    if(!keyword)
    getEvents();
    
  }, [eventList]);



  return(
      <>
      <div className="header">
          <Header/> 
          <User />
          <SearchEvent 
          setKeyword={setKeyword}
          />
      </div>
      <div className="contenedor-listEvents">
              {eventList.map((event) =>(
          <div className="event-item">
                  <Event 
                  key={event.id}
                  event={event}
                  />
                  </div>
              ))}
          
      </div>
  )
     
     </>
  )};

export default ListEvents;
