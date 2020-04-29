import React, { useState, useEffect } from "react";
import { getById } from "../../services/data";
import { useSelector } from "react-redux";
import Footer from "../../components/footer/Footer";


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

  //Me pide que pase como dependencia fetchevents?
  
if(!eventProfile){
  return <p>loading...</p>
}

  return(
    <>
  <p>{eventProfile.map((evento)=>(
    <>
    <div>{evento.event.eventName}</div>
    </>
  ))}</p>
  <Footer />
  </>
  )
};

export default MyEvents;

//Line para mostarr la foto
 //<img alt="" src={evento.eventImg}></img>