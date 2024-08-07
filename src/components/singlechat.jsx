import React from 'react'
import { ChatState } from '../context/chatprovider'

const SingleChat = ({fetchAgain,setFetchAgain}) => {
    const {user,selectedChat,setSelectedChat}=ChatState();
  return (
    <>
    {selectedChat?(
        <></>
    ):(<>
    
    
    </>)}
    </>
  )
}

export default SingleChat