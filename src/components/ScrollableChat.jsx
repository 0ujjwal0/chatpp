import React from 'react'
import ScrollableFeed from 'react-scrollable-feed';
const ScrollableChat = ({messages}) => {
  return (
    <ScrollableFeed>
        {messages && messages.map((m,i)=>(<div className='flex' key={m._id}>

        </div>))}
    </ScrollableFeed>
  )
}

export default ScrollableChat