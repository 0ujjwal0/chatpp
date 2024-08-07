import React from "react";
import { ChatState } from "../context/chatprovider";
import SingleChat from "./singlechat";

const Chatbox = ({fetchAgain,setFetchAgain}) => {
  const { selectedChat } = ChatState();

  return (
    <div
      className={`${
        selectedChat ? "flex" : "hidden"
      } md:flex flex-col  p-3 bg-white w-full md:w-2/3 rounded-lg border`}
    >
      <SingleChat
        fetchAgain={fetchAgain}
        setFetchAgain={setFetchAgain}
      />
    </div>
  );
};

export default Chatbox;
