import React, { useContext, useEffect, useState } from 'react';
import ArtContext from "../ContextAPI/ArtWorks/artContext";
import { useNavigate } from 'react-router-dom';
import ChatMember from './ChatMember';
import ChatMessages from './ChatMessages';

const Chat = () => {
  const history = useNavigate();
  const context = useContext(ArtContext);
  const { activatemsg, chatbuddy } = context; // will activate the chat window once the user clicks on a site member.
  const host = `http://localhost:5000`; // Use a safe port like 5000
  const [list_Of_Users, Set_list_Of_users] = useState([]);
  const [user, setUser] = useState("")
  const [chat_msg, setChat_msg] = useState([]);
  const [chatBakwas, SetChatBakwas] = useState({ chatBakwas: "" }) // bakwas === comment
  const get_chat_messages = async () => {
    console.log("calling get chat messages function")
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
  }, [chatbuddy, setChat_msg]); // Correctly set the dependency array

  const onChange = (e) => {
    SetChatBakwas({ ...chatBakwas, [e.target.name]: e.target.value })
  }



  const fun_addChat = async () => {
    try {
      const response = await fetch(`${host}/api/chat/send_message/${chatbuddy._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ 'message': chatBakwas.chatBakwas })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    }
    catch (error) {
      console.error("Failed to send chat messages: ", error);
    }

    SetChatBakwas({ chatBakwas: "" }); // Clear the input field
    get_chat_messages();
  }



  useEffect(() => {

    const fun_user = async () => {
      try {
        const token_1 = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/auth/getloggedin_user/${token_1}`, {
          method: 'POST',
          //headers: { 'Content-Type': 'application/json' }
        })

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setUser(data);
        //console.log('this is the response', data);
      }
      catch (error) {
        console.error('catch error', error);
      }
    }
    fun_user();
  }, [])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      // Fetching all users function
      const getAllUser = async () => {
        try {
          const response = await fetch(`${host}/api/auth/fetchallusers`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            }
          });
          const list_Of_Users_temp = await response.json();
          Set_list_Of_users(list_Of_Users_temp);
          //console.log("These are the users =", list_Of_Users_temp);

        } catch (error) {
          console.error("Failed to fetch users: ", error);
        }
      };
      getAllUser();
    } else {
      history("/login");
    }
  }, [history]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fun_addChat();
    }
  };

  return (
    <>
      <div className='d-flex flex-row mb-3'>

        <div className="p-2">
          <div className='container' style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }}>
            {list_Of_Users.map((e, i) => (
              (user.name !== list_Of_Users[i].name) && (e._id !== undefined) && <ChatMember key={e._id} post={list_Of_Users[i]} i={i} />))}
          </div>
        </div>


        {chatbuddy._id && <div className="p-2">
          <div className='container'><ChatMessages /></div>
          <input type='text' placeholder='Enter your message' onKeyDown={handleKeyDown} onChange={onChange} name='chatBakwas' value={chatBakwas.chatBakwas}></input>
          <button type='button' onClick={fun_addChat}>Send Chat</button>
        </div>}

      </div>
    </>
  );
}

export default Chat;
