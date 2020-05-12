import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import axios from "axios";
// import { getAssistent } from "../../services/data";
import { useSelector } from "react-redux";
import "./Detail.scss";
import { createNewAsistente, getById, removeAssistant, createNewWithId, addMyEvents,removeMyEvents } from "../../services/data";

const Detail = (props) => {
  let { id } = useParams();
  const user = useSelector((state) => state.user);
  const history = useHistory();
  console.log("Detail --->userName ", user);

  const [eventsDetails, setEventsDetails] = useState();
  const [asistentes, setAsistentes] = useState([]);
  const [asistire,setAsistire] = useState(false);


  // Opcion 1: Pon la estructura de datos que vayas a usar en la template
  //const [eventsDetails, setEventsDetails] = useState({ dates: { start: { localDate: ''}}});

  const fetchAsistentes = async () => {
    const dbAsistentes = await getById("asistentes", id);
    console.log("Asistentes al evento", dbAsistentes);
    if(dbAsistentes){
      const dbAsistire = dbAsistentes.users.some((asistente)=>{
        return asistente.id === user.id;
    })
    setAsistentes(dbAsistentes.users);
    setAsistire(dbAsistire);
  }
  };

  useEffect(() => {
    if(user){
      fetchAsistentes();

    }
  }, [user]);

  useEffect(() => {
    const getEventsDetails = async () => {
      const apikey = `DxSOpYSZ4nVwPWsGOWdELH14DJA5EIYL`;
      const url = `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${apikey}&countryCode=ES`;
      const response = await axios(url);
      console.log('responsedata', response.data);
      setEventsDetails(response.data);
    };

   getEventsDetails();
  }, [id]);



  const handleRemoveAssistant = (event) => {
    event.preventDefault();
    removeAssistant("asistentes", user, id);
    removeMyEvents("profiles",user.id,{ eventId: eventsDetails.id,eventName:eventsDetails.name, eventImg: eventsDetails.images[0].url});
    fetchAsistentes();
  };


  if (!eventsDetails || !user) {
    return <p>Loading...</p>;
  }

  const event = { eventId: eventsDetails.id,eventName:eventsDetails.name}


  const handleSubmit = (event) => {
    event.preventDefault();
    createNewAsistente("asistentes", user, id);
    addMyEvents("profiles",user.id,{ eventId: eventsDetails.id,eventName:eventsDetails.name, eventImg: eventsDetails.images[0].url})
    fetchAsistentes();

  };

  return (
    <>
      <div className="card-detail">
        <div className="card-detail-content">
          <img alt="" src={eventsDetails.images[1].url}></img>
        </div>

        <div className="card-detail-description">
          <h4>{eventsDetails.name}</h4>
          <p>Date: {eventsDetails.dates.start.localDate}</p>
          <p>⏰ {eventsDetails.dates.start.localTime}</p>
          <p> 🏟️ : {eventsDetails._embedded.venues[0].name}</p>
          <p>City: {eventsDetails._embedded.venues[0].city.name}</p>

            <div>
            {asistentes.length <= 0 ?
            (
              <p>Aun no hay asistentes a este evento</p>
            ):
            (
              <div className="collapsible">
                <section id="asistentes">
                <a href = "#asistentes">👨👩‍<h3>{asistentes.length} {asistentes.length === 1 ? 'asistente' : 'asistentes'}</h3></a>
                  {asistentes.map((person)=>(
                <p key={Math.random()}>{person.name}</p>
              ))}
                </section>
              </div>)}

              <br/>
          {asistire ? (
            <button type="submit" onClick={handleRemoveAssistant}>
            Remove assistant
          </button>
          ):(
          <button type="submit" onClick={handleSubmit}>
            I want to go
          </button>
          )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Detail;

/* <div>👨👩‍Asistentes : {asistentes.map((person)=>(
              <p>{person.name}</p>
            ))}


       <main class="collapsible">
   <section id="asistentes">
     <a href="#asistentes"><h1>view more...</h1></a>
     <p>
       Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, ipsum.
     </p>
   </section>
 </main>



             */