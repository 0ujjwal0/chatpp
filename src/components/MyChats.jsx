import React, { useState, useEffect } from "react";
import { ChatState } from "../context/chatprovider";
import { toast } from "react-toastify";
import { Add as AddIcon } from "@mui/icons-material";
import axios from "axios";
import { getSender } from "../config/chatlogics";
import ChatLoading from "./chatloading";
import Groupchatmodal from "./misc/groupchatmodal";

const MyChats = ({fetchAgain}) => {
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
      className={`flex flex-col items-center p-3 bg-white border rounded-lg border-gray-200
      ${selectedChat ? "hidden md:flex" : "flex"}`}
    >
      <div
        className={`flex justify-between items-center p-3 pb-3 px-3 w-full
      text-2xl md:text-3xl font-sans`}
      >
        chats
        <Groupchatmodal>
          <button
            className={`flex items-center px-4 py-2 rounded-lg text-white bg-blue-500
        text-sm lg:text-base md:text-xs font-medium hover:bg-blue-600 focus:outline-none`}
          >
            <AddIcon className="mr-2" />
            New Group Chat
          </button>
        </Groupchatmodal>
      </div>
      <div className="flex flex-col p-3 bg-gray-100 w-full h-full rounded-lg overflow-hidden">
        <div className="flex flex-col overflow-y-auto">
          {chats ? (
            <div className="flex flex-col space-y-2">
              {chats.map((chat) => (
                <div
                  key={chat._id}
                  onClick={() => setSelectedChat(chat)}
                  className={`cursor-pointer px-3 py-2 rounded-lg ${
                    selectedChat === chat
                      ? "bg-teal-500 text-white"
                      : "bg-gray-200 text-black"
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
