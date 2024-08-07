import React, { useState } from "react";
import { ChatState } from "../context/chatprovider";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { getSender, getSenderFull } from "../config/chatlogics";
import Profilemodal from "./misc/profilemodal";
import UpdateGroupChatModal from "./misc/updategroupchatmodal";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [showModal, setShowModal] = useState(false);

  const handleProfileClick = () => {
    setShowModal(true);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <div className="flex justify-between items-center w-full">
            <ArrowBackIosNewIcon onClick={() => setSelectedChat("")} />
            {!selectedChat.isGroupChat ? (
              <div className="text-2xl font-bold">
                {getSender(user, selectedChat.users)}
                <button onClick={handleProfileClick}>View Profile</button>
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
