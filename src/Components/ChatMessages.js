import React, { useContext } from 'react'
import ArtContext from "../ContextAPI/ArtWorks/artContext";

const ChatMessages = () => {
  const context = useContext(ArtContext);
  const { activatemsg, chatbuddy } = context; // will activate the chat window once the user clicks on a site member.
  
  return (
    <div>
      {activatemsg && <p>HI THIS IS {(chatbuddy.name)}</p>}
    </div>
  )
}

export default ChatMessages
