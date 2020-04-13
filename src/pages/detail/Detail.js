import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { useParams, useHistory } from "react-router";
import axios from "axios";
// import { getAssistent } from "../../services/data";
import SearchEvent from "../../components/searchEvent/SearchEvent";
import User from "../user/User";
import { useSelector } from 'react-redux';
import './Detail.scss';


const Detail = (props) => {
  let { id } = useParams();
  const user = useSelector(state => state.user);
  const history = useHistory();
  console.log("Detail --->userName ",user)
  
  const [eventsDetails, setEventsDetails] = useState();

  // Opcion 1: Pon la estructura de datos que vayas a usar en la template
  //const [eventsDetails, setEventsDetails] = useState({ dates: { start: { localDate: ''}}});

  // const [asistentes, setAsistentes] = useState([]);

  useEffect(() => {
    const fetchAsistentes = async () => {
      // const dbAsistentes = await getAssistent(id);
    };
    fetchAsistentes();
  }, []);

  useEffect(() => {
    const getEventsDetails = async() => {
      const apikey = `DxSOpYSZ4nVwPWsGOWdELH14DJA5EIYL`;
      const url = `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${apikey}&countryCode=ES`;
      const response = await axios(url);
      console.log(response.data);

      setEventsDetails(response.data);
  }

    getEventsDetails();
  }, [id]);

  /* Opcion 2: Añade un loader mientras se carga la página, si intentas acceder a un elemento que aun no tienes te peta,
    con esto evitas intentar renderizar algo hasta que esta disponible.
  */
  if (!eventsDetails) {
    return (<p>Loading...</p>)
  }
  return (
    
    <div className = "card-detail">
      <div className = "card-detail-content">
        <img  src={eventsDetails.images[0].url}></img>
        <h2>{eventsDetails.name}</h2>
        <p>Date: {eventsDetails.dates.start.localDate}</p>
        <p>Time: {eventsDetails.dates.start.localTime}</p>
        <p>Location: {eventsDetails._embedded.venues[0].name}</p>
        <p>City: {eventsDetails._embedded.venues[0].city.name}</p>
      </div>
      <button type="submit">I want to go</button>
    </div>
  );
};

/*
<img  src={eventsDetails.images.url}></img>
  <div className="header">
        <Header />
        <User />
        <SearchEvent />
      </div>
*/
export default Detail;
