import React from "react";
import Event from "../components/event/Event";
import Footer from "../components/footer/Footer";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useFetch } from "../hooks/useFetch";

const Family = () => {
  const { loading, data } = useFetch("sports");

  if (!data) {
    return <p>{loading}</p>;
  }

  return (
    <div className="wrapper">
      <header className="my-events__header">
        <Link to={"/eventcategory"} className="my-events__header__logo">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <h3 className="my-events__header__title">Family ({data.length})</h3>
      </header>

      <div className="container row">
        <div className="list-events">
          {data.map((event) => (
            <div className="event-item" key={event.id}>
              <Event event={event} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Family;
