import React,{ useState,useEffect } from 'react';
import Header from '../header/Header';
import axios from 'axios';


const ListEvents = () => {

    const [eventList,setEventList]=useState([]);
    
    const getEvents = async ()=>{
        const apikey = `DxSOpYSZ4nVwPWsGOWdELH14DJA5EIYL`;
        const url= `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apikey}&countryCode=ES`;
        const response = await axios(url);
        setEventList(response.data._embedded.events);  
    }


    return ( 
        <Header />

     );
}
 
export default ListEvents;