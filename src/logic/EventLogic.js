import {
  getById,
  mergeArrayElement,
  addArrayEllement,
  removeArrayElement,
  removeArrayElement2,
} from "../services/data";
import {
  fetchEvents,
  fetchEventsDetails,
  fetchEventsCategory,
} from "../services/EventsService";

export async function addMyEvents(
  collection,
  id,
  event = { eventId: "", eventName: "", eventImg: "" }
) {
  const result = await addArrayEllement(collection, id, event);
}

export async function removeMyEvents(
  collection,
  id,
  event = { eventId: "", eventName: "", eventImg: "" }
) {
  const result = await removeArrayElement(collection, id, event);
}

export async function createNewAsistente(collection, user, id) {
  if (collection && user && id) {
    const result = await mergeArrayElement(collection, user, id);
  } else {
    return null;
  }
}

export async function removeAssistant(collection, user, id) {
  const result = await removeArrayElement2(collection, user, id);
}

export async function getUserById(collection, id) {
  const result = await getById(collection, id);
  return result;
}

export async function getArtist(keyword) {
  const result = await fetchEvents(keyword);
  return result;
}

export async function getEventsById(id) {
  const result = await fetchEventsDetails(id);
  return result;
}

export async function getEventsByCategory(category) {
  console.log(category);

  const result = await fetchEventsCategory(category);
  return result;
}
