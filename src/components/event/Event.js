import React from 'react';
import './event.css'
const Event = ({ event }) => {

    const{ name } = event
    return ( 
        <>  
    <h3>{name}</h3>
    <img  src={event.images[3].url}></img>
    <p>Fecha :{event.dates.start.localDate}</p>
    <p>Hora :{event.dates.start.localTime}</p>
    <p>Ciudad :{event._embedded.venues[0].city.name}</p>
    <p>Lugar :{event._embedded.venues[0].name}</p>

    <hr/>
    </>
     );
}
 
export default Event;