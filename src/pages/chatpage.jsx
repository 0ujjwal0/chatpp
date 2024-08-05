import React, { useEffect, useState } from 'react'
import axios from "axios";
import { ChatState } from '../context/chatprovider';
import Sidedrawer from '../components/misc/Sidedrawer';
import MyChats from '../components/MyChats';
import Chatbox from '../components/Chatbox';

const Chatpage = () => {
 const {user}=ChatState();
  return (
    <div className="w-screen bg-green-500">
      {user && <Sidedrawer/>}
      <div className='flex justify-between w-screen h-5/6 p-[10px]'>
        {user && <MyChats/>}
        {user && <Chatbox/>}
      </div>
    </div>
  );
}

export default Chatpage