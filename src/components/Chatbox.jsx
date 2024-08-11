import React from "react";
import { ChatState } from "../context/chatprovider";
import SingleChat from "./singlechat";

const Chatbox = ({fetchAgain,setFetchAgain}) => {
  const { selectedChat } = ChatState();

  return (
    <div
      className={`${
        selectedChat ? "flex" : "hidden"
      } md:flex flex-col  p-3 bg-white h-full w-full md:w-3/4 rounded-lg border border-b-violet-500`}
    >
      <SingleChat
        fetchAgain={fetchAgain}
        setFetchAgain={setFetchAgain}
      />
    </div>
  );
};

export default Chatbox;
