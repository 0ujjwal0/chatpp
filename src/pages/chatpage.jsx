import React, { useEffect, useState } from 'react'
import axios from "axios";
const Chatpage = () => {
  const [chats,setchats]=useState([]);
 const fetchchats=async()=>{
    const {data}= await axios.get('/api/chat')
   setchats(data);
  }
  useEffect(()=>{
fetchchats();
  },[])

  return (
    <div>{chats.map((chat)=>(<div key={chat._id}>{chat.chatName}</div>))}</div>
  )
}

export default Chatpage