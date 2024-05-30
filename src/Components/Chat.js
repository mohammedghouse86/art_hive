import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatMember from './ChatMember';

const Chat = () => {
  const history = useNavigate();
  const host = `http://localhost:5000`; // Use a safe port like 5000
  const [list_Of_Users, Set_list_Of_users] = useState([]);

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

  return (
    <div className='container'>
      
      {list_Of_Users.map((e, i) => (
        (e._id !== undefined) && <ChatMember key={e._id} post={list_Of_Users[i]} i={i} />
      ))}
    </div>
  );
}

export default Chat;
