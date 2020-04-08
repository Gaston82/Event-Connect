import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { useParams } from "react-router";
import axios from "axios";
// import { getAssistent } from "../../services/data";
import SearchEvent from "../../components/searchEvent/SearchEvent";
import User from "../user/User";

const Detail = (props) => {
  let { id } = useParams();

  const [eventsDetails, setEventsDetails] = useState([]);
  // const [asistentes, setAsistentes] = useState([]);

  useEffect(() => {
    const fetchAsistentes = async () => {
      // const dbAsistentes = await getAssistent(id);
    };
    fetchAsistentes();
  }, []);

  useEffect(() => {
    const getEventsDetails = async() => {
      const apikey = `DxSOpYSZ4nVwPWsGOWdELH14DJA5EIYL`;
      const url = `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${apikey}&countryCode=ES`;
      const response = await axios(url);
      console.log(response.data);

      setEventsDetails(response.data);
  }

    getEventsDetails();
  }, [id]);

  return (
    <>
      <div className="header">
        <Header />
        <User />
        <SearchEvent />
      </div>
    <p>{JSON.stringify(eventsDetails.dates)}</p>
    <p>{}</p>

      <button type="submit">join</button>
    </>
  );
};

/*
<img  src={eventsDetails.images.url}></img>
*/
export default Detail;
