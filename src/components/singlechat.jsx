import React, { useEffect, useState } from "react";
import { ChatState } from "../context/chatprovider";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { getSender, getSenderFull } from "../config/chatlogics";
import Profilemodal from "./misc/profilemodal";
import UpdateGroupChatModal from "./misc/updategroupchatmodal";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { toast } from "react-toastify";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleProfileClick = () => {
    setShowModal(true);
  };

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      setLoading(true);
      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      console.log(data);
      setMessages(data);
      setLoading(false);
    } catch (error) {
      toast.error("failed to load the messages", { autoClose: 2000 });
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);
  const sendMessage = async (ev) => {
    if (ev.key === "Enter" && newMessage) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          { content: newMessage, chatId: selectedChat._id },
          config
        );
        console.log(data);

        setMessages([...messages, data]);
      } catch (error) {
        toast.error("failed to send the message", { autoClose: 2000 });
      }
    }
  };
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    //typing indicator logic
  };

  return (
    <>
      {selectedChat ? (
        <>
          <div className="flex justify-between items-center w-full border border-b-violet-300 rounded-lg p-1 px-2">
            <ArrowBackIosNewIcon
              className="text-violet-500"
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat ? (
              <div className="text-2xl font-bold">
                <button
                  className="text-violet-500 hover:text-violet-300 rounded-md px-1"
                  onClick={() => handleProfileClick()}
                >
                  {capitalizeFirstLetter(getSender(user, selectedChat.users))}
                </button>
                <Profilemodal
                  user={getSenderFull(user, selectedChat.users)}
                  showModal={showModal}
                  setShowModal={() => setShowModal()}
                />
              </div>
            ) : (
              <div className="text-2xl font-bold">
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              </div>
            )}
          </div>
          <div className="m-auto h-full w-full flex  justify-center items-center">
            {!loading ? (
              <div className="">
                <CircularProgress
                  w={50}
                  h={50}
                  color="secondary"
                />
              </div>
            ) : (
              <div>messages</div>
            )}

            <input
              type="text"
              placeholder="enter a message..."
              value={newMessage}
              onKeyDown={sendMessage}
              onChange={typingHandler}
            />
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="text-3xl font-sans font-semibold text-violet-900 shadow-lg p-2 rounded-lg border-b-2 border-b-violet-300">
            Click any user to chat
          </div>
        </div>
      )}
    </>
  );
};

export default SingleChat;
