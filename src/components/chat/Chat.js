import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getRealTime } from "../../services/data";
import {
  getIdCompare,
  getChatById,
  createNewChatWithId,
  updateMsgText,
} from "../../logic/ChatLogic";

import "./Chat.scss";

const Chat = (props) => {
  const user = useSelector((state) => state.user);
  console.log("user en chat", user);

  let { id, name } = useParams();

  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");

  const chatId = getIdCompare(user.id, id);

  useEffect(() => {
    const checkChatRoom = async () => {
      const resultChat = await getChatById("chat", chatId);
      if (resultChat == null) {
        createNewChatWithId(
          "chat",
          {
            msgText: [],
            users: [user.id, id],
          },
          chatId
        );
      }
    };
    checkChatRoom();
  }, [user, id]);

  useEffect(() => {
    const fetchMessages = async () => {
      getRealTime(chatId, (dbMessages) => {
        console.log(dbMessages);

        setChat(dbMessages.msgText);
      });
    };
    fetchMessages();
  }, []);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleMessage = (e) => {
    e.preventDefault();
    const newChat = [
      ...chat,
      {
        timestamt: +new Date(),
        name: user.name,
        img: user.image,
        userId: user.id,
        msg: input,
      },
    ];
    updateMsgText(chatId, newChat);
  };
  if (!chat) {
    return "Start now";
  }

  return (
    <>
      <div className="chat-container">
        <div className="msg-header">
          <div className="msg-header__img">
            <img src="" alt="" />
          </div>
          <div className="chat__desc">
            {chat.map((mensajes) => (
              <>
                <p>{mensajes.msg}</p>
                <img src={mensajes.img}></img>
              </>
            ))}
          </div>
        </div>
      </div>
      <form onSubmit={handleMessage} className="form-chat">
        <input
          type="text"
          name="content"
          value={input}
          onChange={handleInput}
        ></input>
        <br></br>
        <button>send</button>
      </form>
    </>
  );
};

export default Chat;
