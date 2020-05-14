import axios from "axios";

const API_KEY = `DxSOpYSZ4nVwPWsGOWdELH14DJA5EIYL`;
const API_BASE = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&countryCode=ES`;

async function fetchEvents(keyword) {
  try {
    const result = await axios(`${API_BASE}&keyword=${keyword}`);
    return result.data._embedded.events;
  } catch (err) {
    return null;
  }
}

async function fetchEventsCategory(category) {
  try {
    const result = await axios(`${API_BASE}&classificationName=${category}`);
    return result.data._embedded.events;
  } catch (err) {
    return null;
  }
}

async function fetchEventsDetails(id) {
  try {
    const result = await axios(
      `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${API_KEY}&countryCode=ES`
    );
    return result.data;
  } catch (err) {
    return null;
  }
}

export { fetchEvents, fetchEventsDetails, fetchEventsCategory };

/*
const getArtist = async () => {
  const apikey = `DxSOpYSZ4nVwPWsGOWdELH14DJA5EIYL`;
  const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apikey}&countryCode=ES&keyword=${keyword}`;
  const response = await axios(url);
  setEventList(response.data._embedded.events)
*/

/*
const getArtist = async (keyword) => {
    const apikey = `DxSOpYSZ4nVwPWsGOWdELH14DJA5EIYL`;
    const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apikey}&countryCode=ES&keyword=${keyword}`;
    const response = await axios(url);
    console.log(response);
    setEventList(response.data._embedded.events)
  }
 */
/*
  const getEvents = async () => {

    const response = await axios(url);
    setEventList(response.data._embedded.events);
  };
*/

/*
  import axios from 'axios';

const API_KEY = '9e6a1fad2a4e7bffcd16924128d1895f';
const API_BASE = 'https://api.themoviedb.org/3';

async function getMovieDetail(id) {
  try {
    const result = await axios.get(`${API_BASE}/movie/${id}?api_key=${API_KEY}`)
    return result.data;
  } catch (err) {
    return null;
  }
}

async function getMovieCredits(id) {
  try {
    const result = await axios.get(`${API_BASE}/movie/${id}/credits?api_key=${API_KEY}`);
    return result.data;
  } catch (err) {
    return null;
  }
}

async function getMovieReviews(id) {
  try {
    const result = await axios.get(`${API_BASE}/movie/${id}/reviews?api_key=${API_KEY}`)
    return result.data;
  } catch (err) {
    return null;
  }
}

export {
  getMovieDetail,
  getMovieCredits,
  getMovieReviews
}
  */
