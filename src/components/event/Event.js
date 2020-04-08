import React from 'react';
import './Event.scss';
import { Link } from "react-router-dom";

const Event = ({ event }) => {

    const{ name,id } = event

    return ( 
        <> 
    <Link to={`/detail/${id}`}>
    <img  src={event.images[1].url}></img>
    </Link>     
    <h5>{name}</h5>
    </>
     );
}
 
export default Event;

/* <p>Fecha :{event.dates.start.localDate}</p>
    <p>Hora :{event.dates.start.localTime}</p>
    <p>Ciudad :{event._embedded.venues[0].city.name}</p>
    <p>Lugar :{event._embedded.venues[0].name}</p>


    <Link to={`/detail/${id}`}>
    <img  src={event.images[1].url}></img>
    </Link>
 */