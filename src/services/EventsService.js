import React from 'react';

const apikey = `DxSOpYSZ4nVwPWsGOWdELH14DJA5EIYL`;
const base_URL = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=ES`;



const getArtist = async (keyword) => {
    const apikey = `DxSOpYSZ4nVwPWsGOWdELH14DJA5EIYL`;
    const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apikey}&countryCode=ES&keyword=${keyword}`;
    const response = await axios(url);
    console.log(response);
    setEventList(response.data._embedded.events)
  }
 

  const getEvents = async () => {
    const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apikey}&countryCode=ES`;
    const response = await axios(url);
    setEventList(response.data._embedded.events);
  };
