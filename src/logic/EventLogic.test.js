import {
  addMyEvents,
  createNewAsistente,
  removeAssistant,
  getUserById,
  removeMyEvents,
} from "./EventLogic";
import * as firebase from "firebase/app";
import { firebaseConfig } from "../config";
import "firebase/firestore";

firebase.initializeApp(firebaseConfig);

const USER = {
  name: "userTest",
  email: "usertest@gmail.com",
  id: "05d7KS35KdRZHbAgrtznra7B7cF3",
  myEvents: [],
};

const EVENT = {
  eventId: `eventId-${Math.random()}`,
  eventImg: `eventImg-${Math.random()}`,
  eventName: `eventName-${Math.random()}`,
};

describe("addMyEvents", () => {
  test("should add an event to my events", async () => {
    await addMyEvents("profiles", USER.id, EVENT);
    const user = await getUserById("profiles", USER.id);
    console.log(user.myEvents);
    const { myEvents } = user;
    const eventToMatch = myEvents.filter(
      (event) => event.event.eventName === EVENT.eventName
    );
    console.log(eventToMatch.length);

    expect(eventToMatch.length > 0).toBe(true);
  });
});

describe("removeMyEvents", () => {
  test("should remove an event to my events", async () => {
    await removeMyEvents("profiles", USER.id, EVENT);
    const user = await getUserById("profiles", USER.id);
    const { myEvents } = user;
    const eventToMatch = myEvents.filter(
      (event) => event.event.eventName === EVENT.eventName
    );
    console.log(eventToMatch.length);

    expect(eventToMatch.length < 1).toBe(true);
  });
});

describe("createNewAsistente", () => {
  // Compruebo en la colleccion de asistentes, en el array users si se ha agregado un asistente con el mismo id de USER

  test("should add an attendee to the collection asistentes", async () => {
    await createNewAsistente("asistentes", USER, EVENT.eventId);
    const event = await getUserById("asistentes", EVENT.eventId);
    const { users } = event;
    const usersToMatch = users.filter((user) => user.id === USER.id);

    console.log("asistentes".length, EVENT.eventId);
    console.log("asistentes", EVENT.eventId);
    console.log(usersToMatch, USER.id);

    expect(usersToMatch.length > 0).toBe(true);
  });
});

describe("createNewAsistente", () => {
  // Compruebo en la colleccion de asistentes, en el array users si se ha agregado un asistente con el mismo id de USER

  test("should add an attendee to the collection asistentes", async () => {
    await createNewAsistente("asistentes", USER, EVENT.eventId);
    const event = await getUserById("asistentes", EVENT.eventId);
    const { users } = event;
    const usersToMatch = users.filter((user) => user.id === USER.id);

    console.log("asistentes".length, EVENT.eventId);
    console.log("asistentes", EVENT.eventId);
    console.log(usersToMatch, USER.id);

    expect(usersToMatch.length > 0).toBe(true);
  });

  test("should return null if not valid params", async () => {
    const result = await createNewAsistente(null, false, null);
    expect(result).toBeFalsy();
  });
});

describe("removeAssistant", () => {
  //

  test("should remove an attendee to the collection asistentes", async () => {
    await removeAssistant("asistentes", USER, EVENT.eventId);
    const event = await getUserById("asistentes", EVENT.eventId);
    const { users } = event;
    const usersToMatch = users.filter((user) => user.id === USER.id);

    expect(usersToMatch.length < 1).toBe(true);
    console.log(EVENT.eventId, USER.id);
  });
});
