import React, { useContext, useEffect, useState } from 'react';
import ArtContext from "../ContextAPI/ArtWorks/artContext";
import ChatPost from './ChatPost';

const ChatMessages = () => {
  const context = useContext(ArtContext);
  const { activatemsg, chatbuddy } = context; // will activate the chat window once the user clicks on a site member.
  const host = `http://localhost:5000`; // Use a safe port like 5000
  const [chat_msg, setChat_msg] = useState([]);

  const get_chat_messages = async () => {
        if (chatbuddy._id) {
          try {
            const response = await fetch(`${host}/api/chat/fetchChats/${chatbuddy._id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
              }
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const msgss = await response.json();
            setChat_msg(msgss);
            console.log("These are the msgss =", chat_msg);
          } catch (error) {
            console.error("Failed to fetch chat messages: ", error);
          }
        }
      };
  useEffect(() => {
    if (chatbuddy) {
      const get_chat_messages = async () => {
        if (chatbuddy._id) {
          try {
            const response = await fetch(`${host}/api/chat/fetchChats/${chatbuddy._id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
              }
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const msgss = await response.json();
            setChat_msg(msgss);
            console.log("These are the msgss =", chat_msg);
          } catch (error) {
            console.error("Failed to fetch chat messages: ", error);
          }
        }
      };
      get_chat_messages();
    }
  }, [chatbuddy, setChat_msg, chat_msg]); // Correctly set the dependency array


  return (
    <div>
      <div className="d-flex flex-row mb-3">
        
        <div className="p-2">      
            <div className='container'>
              {chat_msg.map((chat_msg_1, i) => {
                return (
                  chat_msg_1._id !== undefined && <ChatPost key={chat_msg_1._id} post={chat_msg_1} i={i} />
                );})}
            </div>
        </div>

       

      </div>
    </div>
  );
};

export default ChatMessages;
