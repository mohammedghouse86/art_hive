import React, { useContext } from 'react'
import ArtContext from "../ContextAPI/ArtWorks/artContext";

const ChatMember = (post) => {
  const context = useContext(ArtContext);
  const { activate_chat, sent_chat_buddy } = context;
  const fun_activate = () =>{
    activate_chat();
    sent_chat_buddy(post.post); // sending the site members details with whome the user wants to chat
  }
  return (
    <div>
      <div className="d-flex justify-content-start mx-2 my-2"> 
      <img src={`${post.post.imageBase64}`} alt={`${post.post.name}`} style={{ width: '45px', height: '50px', borderRadius: '50%', border: '2px solid red' }} />
        <button type='button' onClick={fun_activate} className="card-text" > {post.post.name} 
        </button>
      </div>
      
    </div>
  )
}

export default ChatMember
