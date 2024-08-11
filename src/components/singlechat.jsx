import React, { useState } from "react";
import { ChatState } from "../context/chatprovider";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { getSender, getSenderFull } from "../config/chatlogics";
import Profilemodal from "./misc/profilemodal";
import UpdateGroupChatModal from "./misc/updategroupchatmodal";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [showModal, setShowModal] = useState(false);

  const capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleProfileClick = () => {
    setShowModal(true);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <div className="flex justify-between items-center w-full border border-b-violet-300 rounded-lg p-1 px-2">
            <ArrowBackIosNewIcon className="text-violet-500" onClick={() => setSelectedChat("")} />
            {!selectedChat.isGroupChat ? (
              <div className="text-2xl font-bold">
                <button
                  className="text-violet-500 hover:text-violet-300 rounded-md px-1"
                  onClick={handleProfileClick}
                >
                  {capitalizeFirstLetter(getSender(user, selectedChat.users))}
                </button>
                <Profilemodal
                  user={getSenderFull(user, selectedChat.users)}
                  showModal={showModal}
                  setShowModal={setShowModal}
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
          <div className=" flex flex-col justify-end w-full h-full rounded-lg p-2 ">
            hi
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="text-3xl font-sans">
            Click on a user to start chatting
          </div>
        </div>
      )}
    </>
  );
};

export default SingleChat;
