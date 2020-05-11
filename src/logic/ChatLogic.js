import { getById, createNewWithId } from "../services/data";

const getIdCompare = (id1, id2) => {
  if (id1 > id2) {
    return id1 + id2;
  } else {
    return id2 + id1;
  }
};

export async function getChatById(collection, id) {
  const result = await getById(collection, id);
  return result;
}

export async function createNewChatWithId(collection, newObj, id) {
  const result = await createNewWithId(collection, newObj, id);
  return result;
}

export { getIdCompare };
