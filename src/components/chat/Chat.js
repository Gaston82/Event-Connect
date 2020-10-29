import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getRealTime } from "../../services/data";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import {
  getIdCompare,
  getChatById,
  createNewChatWithId,
  updateMsgText,
} from "../../logic/ChatLogic";

import "./Chat.scss";

const Chat = (props) => {
  const user = useSelector((state) => state.user);
  console.log({ user });

  let { id } = useParams();

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
  }, [user, id, chatId]);

  useEffect(() => {
    const fetchMessages = async () => {
      getRealTime(chatId, (dbMessages) => {
        console.log(dbMessages);

        setChat(dbMessages.msgText);
      });
    };
    fetchMessages();
  }, [chatId]);

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
    setInput("");
  };
  if (!chat) {
    return "Start now";
  }

  return (
    <div className="wrapper">
      <header className="my-events__header">
        <Link to={"/home"} className="my-events__header__logo">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <h3 className="my-events__header__title">Messages ({chat.length})</h3>
      </header>
      <div className="chat-container">
        {chat.map((mensajes) => (
          <div className="chat-card" key={mensajes.timestamt}>
            <img src={mensajes.img} alt=""></img>
            <p>{mensajes.msg}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleMessage} className="form-chat">
        <input
          type="text"
          name="content"
          autoComplete="off"
          value={input}
          onChange={handleInput}
        ></input>
        <br></br>
        <button>send</button>
      </form>
    </div>
  );
};

export default Chat;
