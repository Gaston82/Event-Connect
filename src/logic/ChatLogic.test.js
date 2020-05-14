import "firebase/firestore";
import * as firebase from "firebase/app";
import { getIdCompare, getChatById } from "./ChatLogic";
import { firebaseConfig } from "../config";
import { getDBConnection } from "../services/data";

firebase.initializeApp(firebaseConfig);
firebase.firestore();

describe("getIdCompare", () => {
  test("should return", () => {
    const USERid1 = "28mCgLS72oZn5Cv2mtrXa69AE413";
    const USERid2 = "DYd4XGZM63QtLF8HSwX3XI7ZM";
    const result = getIdCompare(USERid1, USERid2);
    expect(result).toBe(USERid2 + USERid1);
    expect(USERid2 > USERid1).toBe(true);
  });
  test("should return", () => {
    const USERid2 = "28mCgLS72oZn5Cv2mtrXa69AE413";
    const USERid1 = "DYd4XGZM63QtLF8HSwX3XI7ZM";
    const result = getIdCompare(USERid1, USERid2);
    expect(result).toBe(USERid1 + USERid2);
  });
});

describe("getChatById", () => {
  test("should return null if id doesn't exist", async () => {
    const USERid1 = "28mCgLS72oZn5Cv2mtrXa69AE413";
    const USERid2 = "DYd4XGZM63QtLF8HSwX3XI7ZM";
    const result = getIdCompare(USERid1, USERid2);
    const resultChat = await getChatById("chat", result);
    expect(resultChat).toBe(null);
  });
});
