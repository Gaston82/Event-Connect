import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getRealTime } from "../../services/data";
import {
  getIdCompare,
  getChatById,
  createNewChatWithId,
} from "../../logic/ChatLogic";

import "./Chat.scss";

const Chat = (props) => {
  const user = useSelector((state) => state.user);
  let { id, name } = useParams();

  const [chat, setChat] = useState({ id: "", name: "", content: "" });
  const [input, setInput] = useState("");
  const hora = new Date().getHours();
  const minutes = new Date().getMinutes();
  const seconds = new Date().getSeconds();
  console.log(hora + minutes + seconds);

  if (user) {
    const result = getIdCompare(user.id, id);
    const newChat = createNewChatWithId(
      "chat",
      {
        msgText: "",
        receiverId: id,
        senderId: user.id,
        timestamp: "",
      },
      result
    );

    //const resultChat = getChatById("chat", result);
    //console.log("este es el resultado del chat", resultChat);
  }

  useEffect(() => {
    const fetchMessages = async () => {
      getRealTime(id, (dbMessages) => {
        setChat(dbMessages);
      });
    };
    fetchMessages();
  }, []);

  const handleInput = (e) => {
    setInput({
      ...chat,
      [e.target.name]: e.target.value,
    });
  };

  const handleMessage = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="chat-container">
        <div className="msg-header">
          <div className="msg-header__img">
            <img src="" />
          </div>
          <div className="chat__desc">
            <h4>{name}</h4>
          </div>
        </div>
      </div>
      <form onSubmit={handleMessage} className="form-chat">
        <input
          type="text"
          name="content"
          value={chat.content}
          onChange={handleInput}
        ></input>
        <br></br>
        <button>send</button>
      </form>
    </>
  );
};

export default Chat;

/*
 useEffect(() => {
        setMessage(user);
            
        }, [user])

*/
