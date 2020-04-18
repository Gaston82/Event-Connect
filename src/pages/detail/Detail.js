import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import axios from "axios";
// import { getAssistent } from "../../services/data";
import { useSelector } from "react-redux";
import "./Detail.scss";
import { createNewAsistente, getById, removeAssistant } from "../../services/data";

const Detail = (props) => {
  let { id } = useParams();
  const user = useSelector((state) => state.user);
  const history = useHistory();
  console.log("Detail --->userName ", user);

  const [eventsDetails, setEventsDetails] = useState();
  const [asistentes, setAsistentes] = useState([]);

 

  // Opcion 1: Pon la estructura de datos que vayas a usar en la template
  //const [eventsDetails, setEventsDetails] = useState({ dates: { start: { localDate: ''}}});

  const fetchAsistentes = async () => {
    const dbAsistentes = await getById("asistentes", id);
    console.log("Asistentes al evento", dbAsistentes);
    setAsistentes(dbAsistentes);
  };

  useEffect(() => {
    fetchAsistentes();
  }, []);

  useEffect(() => {
    const getEventsDetails = async () => {
      const apikey = `DxSOpYSZ4nVwPWsGOWdELH14DJA5EIYL`;
      const url = `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${apikey}&countryCode=ES`;
      const response = await axios(url);
      console.log(response.data);
      setEventsDetails(response.data);
    };

    getEventsDetails();
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    createNewAsistente("asistentes", user, id);
    fetchAsistentes();
  };

  const handleRemoveAssistant = (event) => {
    event.preventDefault();
    removeAssistant("asistentes", user, id);
    fetchAsistentes();
  };
  

  /* Opcion 2: Añade un loader mientras se carga la página, si intentas acceder a un elemento que aun no tienes te peta,
    con esto evitas intentar renderizar algo hasta que esta disponible.
  */
  if (!eventsDetails || !user) {
    return <p>Loading...</p>;
  }

  
  
  
  return (
    <>
      <div className="card-detail">
        <div className="card-detail-content">
          <img alt="" src={eventsDetails.images[0].url}></img>
          <h4>{eventsDetails.name}</h4>
          <p>Date: {eventsDetails.dates.start.localDate}</p>
          <p>⏰: {eventsDetails.dates.start.localTime}</p>
          <p> 🏟️ : {eventsDetails._embedded.venues[0].name}</p>
          <p>City: {eventsDetails._embedded.venues[0].city.name}</p>
        </div>
       <div>
          <div> {!asistentes ? (
              <p>Aun no hay asistentes a este evento</p>
            ):(<div>👨👩‍Asistentes : {asistentes.users.map((person)=>(
              <span>{person.name},</span> 
            ))}
            
            </div>)}
          </div>
        </div><br/>
        <button type="submit" onClick={handleSubmit}>
          I want to go
        </button><br/>
        <button type="submit" onClick={handleRemoveAssistant}>
          Remove assistant
        </button>
      </div>
    </>
  );
};
export default Detail;

