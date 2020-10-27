import { useState, useEffect } from "react";
import { getEventsByCategory } from "../logic/EventLogic";

export const useFetch = (category) => {
  //const [eventList, setEventList] = useState();
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchCategory = async () => {
      const data = await getEventsByCategory(category);
      setState({
        loading: false,
        error: null,
        data,
      });
    };
    fetchCategory();
  }, [category]);

  return state;
};
