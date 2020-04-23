import React, { useState, useEffect } from "react";
import { getById } from "../../services/data";
import { useSelector } from "react-redux";


const MyEvents = () => {
  
  const [eventProfile, setEventProfile] = useState([]);
  const user = useSelector((state) => state.user);
  //console.log("myevents=>user",user);


  const fetchEvents = async () => {
    const dbMyEvents = await getById("profiles", user.id);
    setEventProfile(dbMyEvents.myEvents);
    console.log("myevents->",dbMyEvents);
  };

  useEffect(() => {
    if(user){
      fetchEvents();
    }
  }, [user]);
  
if(!eventProfile){
  return <p>loading...</p>
}

  return(
  <p>{eventProfile.map((evento)=>(
    <div>{evento.eventName}</div>
  ))}</p>
  )
};

export default MyEvents;
