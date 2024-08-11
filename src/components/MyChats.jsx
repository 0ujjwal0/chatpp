import React, { useState, useEffect } from "react";
import { ChatState } from "../context/chatprovider";
import { toast } from "react-toastify";
import { Add as AddIcon } from "@mui/icons-material";
import axios from "axios";
import { getSender } from "../config/chatlogics";
import ChatLoading from "./chatloading";
import Groupchatmodal from "./misc/groupchatmodal";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const fetchChats = async () => {
    if (!user || !user.token) {
      toast.error("User not authenticated", { autoClose: 3000 });
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/chat", config);
      setChats(data);
      console.log(data);
    } catch (error) {
      const errorMsg = error.response
        ? error.response.data.message
        : error.message;
      toast.error(`Error occurred: ${errorMsg}`, { autoClose: 3000 });
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      setLoggedUser(JSON.parse(storedUser));
    }

    if (user) {
      fetchChats();
    }
  }, [fetchAgain]);

  return (
    <div
      className={`flex flex-col items-center p-3 bg-white rounded-lg w-full md:w-1/4 border border-b-violet-500
  ${selectedChat ? "hidden md:flex" : "flex"}`}
    >
      <div
        className={`flex justify-end items-center p-3 pb-3 w-full 
    text-xl md:text-2xl lg:text-3xl font-sans`}
      >
        <Groupchatmodal>
          <button
            className={`hover:text-white hover:bg-violet-500
        text-sm md:text-xs lg:text-base text-gray-600 focus:outline-none px-2 rounded-lg border border-b-violet-500`}
          >
            <AddIcon className="text-violet-600 " />
            New Group
          </button>
        </Groupchatmodal>
      </div>
      <div className="flex flex-col p-3 bg-white w-full h-full shadow-lg rounded-lg overflow-hidden border ">
        <div className="flex flex-col overflow-y-auto">
          {chats ? (
            <div className="flex flex-col space-y-2">
              {chats.map((chat) => (
                <div
                  key={chat._id}
                  onClick={() => setSelectedChat(chat)}
                  className={`cursor-pointer px-3 py-2 rounded-lg border border-b-violet-500 ${
                    selectedChat === chat
                      ? "text-white bg-violet-500 "
                      : "bg-gray-100 text-violet-900 shadow-xl hover:bg-violet-100"
                  }`}
                >
                  <div>
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ChatLoading />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyChats;
