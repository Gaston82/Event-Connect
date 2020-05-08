import React, { useEffect, useState } from "react";
import { useParams, useHistory,Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { useSelector } from "react-redux";
import "./Detail.scss";
import { createNewAsistente,addMyEvents,removeMyEvents,removeAssistant, getUserById } from '../../logic/EventLogic';

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
    const dbAsistentes = await getUserById("asistentes", id);
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
      console.log(response.data);
      setEventsDetails(response.data);
    };

   getEventsDetails();
  }, [id]);

  

  const handleRemoveAssistant = async (event) => {
    event.preventDefault();
    await removeAssistant("asistentes", user, id);
    await removeMyEvents("profiles",user.id,{ eventId: eventsDetails.id,eventName:eventsDetails.name, eventImg: eventsDetails.images[0].url});
    fetchAsistentes();
  };
  

  if (!eventsDetails || !user) {
    return <p>Loading...</p>;
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    createNewAsistente("asistentes",user,id);
    addMyEvents("profiles",user.id,{ eventId: eventsDetails.id,eventName:eventsDetails.name, eventImg: eventsDetails.images[0].url})
    fetchAsistentes();
    console.log(user.myEvents.length);
    
  };

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  const monthIndex = new Date(eventsDetails.dates.start.localDate).getMonth()
  const monthName = months[monthIndex].toUpperCase();
  const day = new Date(eventsDetails.dates.start.localDate).getDate();
  const year = new Date(eventsDetails.dates.start.localDate).getFullYear();
 

  
  return (
    <>
      <Link to = {'/home'} className ="user-logo" >
          <FontAwesomeIcon icon={faArrowLeft} />
      </Link>
      <div className="card-detail">
        <div className="card-detail__content">
          <img alt="" src={eventsDetails.images[0].url} className = "card-detail__img"></img>
          <h3>{eventsDetails.name}</h3>
          <div>
            <p>{monthName.substring(0,3)}</p>
            <p>0{day}</p>
            <p>{year}</p>
          </div>
          <p>⏰ {eventsDetails.dates.start.localTime.substring(0,5)}</p>
          <p> 🏟️ : {eventsDetails._embedded.venues[0].name}</p>
          <p>City: {eventsDetails._embedded.venues[0].city.name}</p>
        </div>
       <div>
          <div> {asistentes.length<=0 ? (
              <p>Aun no hay asistentes a este evento</p>
            ):(<div className = "collapsible">
              <section className = "asistentes">
                {asistentes.map((person)=>(
              <div className = "person">
                <Link to={`/chat/${person.id}`}>
                <img alt="" src={person.image} className ="person__img"/>      
                </Link>  
              </div> 
              
            ))}
              </section>
            </div>)}
          </div>
       </div><br/>
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
    </>
  );
};
export default Detail;
/*
          <p>{monthName = months[eventsDetails.dates.start.localDate.getMonth()]}</p>
          div> {asistentes.length<=0 ? (
              <p>Aun no hay asistentes a este evento</p>
            ):(<div className = "collapsible">
              <section id = "asistentes">
              <a href = "#asistentes">‍<h3>{asistentes.length} asistentes</h3></a>
                {asistentes.map((person)=>(
              <div className = "person">  
                  <img alt="" src={person.image} className ="collapsible__img"/> 
                  <p>{person.name}</p>
              </div> 
              
            ))}
              </section>
            </div>)}
          </div>
       </div><br/>

        <div className = "person">  
                  <img alt="" src={person.image} className ="collapsible__img"/> 
                  <p>{person.name}</p>
              </div> 
              
            ))}


          <p>Day: {new Date(eventsDetails.dates.start.localDate).getFullYear()}</p>


*/
