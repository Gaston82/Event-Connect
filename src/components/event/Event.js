import React from 'react';
const Event = ({ event }) => {

    const{ name } = event
    return ( 
        <>
    <img></img>    
    <h3>{name}</h3>
    <img src={event.images[0].url}></img>
    <p>Fecha :{event.dates.start.localDate}</p>
    <p>Hora :{event.dates.start.localTime}</p>
    <p>Ciudad :{event._embedded.venues[0].city.name}</p>
    <p>Lugar :{event._embedded.venues[0].name}</p>

    <hr/>
    </>
     );
}
 
export default Event;