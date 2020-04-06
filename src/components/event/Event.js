import React from 'react';
import './event.css';
import { Link } from "react-router-dom";

const Event = ({ event }) => {

    const{ name,id } = event

    return ( 
        <>  
    <Link to={`/detail/${id}`}>
    <img  src={event.images[3].url}></img>
    </Link>
    <h3>{name}</h3>
    <p>Fecha :{event.dates.start.localDate}</p>
    <p>Hora :{event.dates.start.localTime}</p>
    <p>Ciudad :{event._embedded.venues[0].city.name}</p>
    <p>Lugar :{event._embedded.venues[0].name}</p>

    <hr/>
    </>
     );
}
 
export default Event;