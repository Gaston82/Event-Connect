import React, { useCallback, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import "./Detail.scss";
import {
  createNewAsistente,
  addMyEvents,
  removeMyEvents,
  removeAssistant,
  getUserById,
  getEventsById,
} from "../../logic/EventLogic";

const Detail = (props) => {
  let { id } = useParams();
  const user = useSelector((state) => state.user);

  const [eventsDetails, setEventsDetails] = useState();
  const [asistentes, setAsistentes] = useState([]);
  const [asistire, setAsistire] = useState(false);

  const fetchAsistentes = useCallback(async () => {
    const dbAsistentes = await getUserById("asistentes", id);
    if (dbAsistentes) {
      const dbAsistire = dbAsistentes.users.some((asistente) => {
        return asistente.id === user.id;
      });
      setAsistentes(dbAsistentes.users);
      setAsistire(dbAsistire);
    }
  }, [user, id]);

  useEffect(() => {
    if (user) {
      fetchAsistentes();
    }
  }, [user, fetchAsistentes]);

  useEffect(() => {
    const fetchArtistsDetails = async () => {
      const response = await getEventsById(id);
      setEventsDetails(response);
    };

    fetchArtistsDetails(id);
  }, [id]);

  const handleRemoveAssistant = async (event) => {
    event.preventDefault();
    await removeAssistant("asistentes", user, id);
    await removeMyEvents("profiles", user.id, {
      eventId: eventsDetails.id,
      eventName: eventsDetails.name,
      eventImg: eventsDetails.images[0].url,
    });
    fetchAsistentes();
  };

  if (!eventsDetails || !user) {
    return <p>Loading...</p>;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    createNewAsistente("asistentes", user, id);
    addMyEvents("profiles", user.id, {
      eventId: eventsDetails.id,
      eventName: eventsDetails.name,
      eventImg: eventsDetails.images[0].url,
    });
    fetchAsistentes();
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthIndex = new Date(eventsDetails.dates.start.localDate).getMonth();
  const monthName = months[monthIndex].toUpperCase();
  const day = new Date(eventsDetails.dates.start.localDate).getDate();
  const year = new Date(eventsDetails.dates.start.localDate).getFullYear();

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayIndex = new Date(eventsDetails.dates.start.localDate).getDay();
  const dayName = days[dayIndex];

  return (
    <>
      <div className="card-detail">
        <Link to={"/home"} className="card-detail__logo">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <div className="card-detail__content">
          <img
            alt=""
            src={eventsDetails.images[1].url}
            className="card-detail__img"
          ></img>
          <h3>{eventsDetails.name}</h3>
          <div className="card-detail__desc">
            <div className="card-detail__desc__left">
              <p>{monthName.substring(0, 3)}</p>
              <p>{day}</p>
              <p>{year}</p>
            </div>
            {eventsDetails.dates.start.localTime ? (
              <div className="card-detail__desc__right">
                <p>
                  {dayName} -{" "}
                  {eventsDetails.dates.start.localTime.substring(0, 5)}
                </p>
                <p>
                  {eventsDetails._embedded.venues[0].city.name} -{" "}
                  {eventsDetails._embedded.venues[0].name}{" "}
                </p>
                <p>{eventsDetails.name}</p>
              </div>
            ) : (
              <p className="card-detail__desc__warning">Time not avaible</p>
            )}
          </div>
        </div>
        <div>
          <br></br>
          <div>
            {" "}
            {asistentes.length <= 0 ? (
              <p>Aun no hay asistentes a este evento</p>
            ) : (
              <div className="collapsible">
                <section className="asistentes">
                  {asistentes.map((person) => (
                    <div className="person" key={person.id}>
                      <Link to={`/chat/${person.id}`}>
                        <img
                          alt=""
                          src={person.image}
                          className="person__img"
                        />
                      </Link>
                    </div>
                  ))}
                </section>
              </div>
            )}
          </div>
        </div>
        <br />
        {asistire ? (
          <button type="submit" onClick={handleRemoveAssistant}>
            I'm not going
          </button>
        ) : (
          <button type="submit" onClick={handleSubmit}>
            I want to go
          </button>
        )}
      </div>
    </>
  );
};
export default Detail;
