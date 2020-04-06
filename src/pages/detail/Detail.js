import React, { useEffect,useState } from 'react';
import Header from '../../components/header/Header';
import { useParams } from "react-router";
import axios from "axios";
import { getAssistent,getById } from '../../services/data'



const Detail = (props) => {
  
let { id } = useParams();

const [eventsDetails,setEventsDetails] = useState([]);
const [asistentes,setAsistentes] = useState([]);


useEffect(() => {
  const fetchAsistentes = async()=>{
    const dbAsistentes = await getAssistent(id);
  }
 fetchAsistentes();
}, [])





useEffect(() => {
  if(id){
    getEventsDetails(id);

  }
  
}, []);

const getEventsDetails = async (id) => {
  
  
  const apikey = `DxSOpYSZ4nVwPWsGOWdELH14DJA5EIYL`;
  const url = `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${apikey}&countryCode=ES`;
  const response = await axios(url);
  console.log(response.data._embedded);
  

  setEventsDetails(response.data);
  console.log(eventsDetails);

};


  
  
    return (
        <>
        <Header />
       <h3>{eventsDetails.name}</h3>
       <button
       type="submit"
       >join</button>
       
        </>
      );
}
 
export default Detail;