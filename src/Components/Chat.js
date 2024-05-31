import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatMember from './ChatMember';
import ChatMessages from './ChatMessages';

const Chat = () => {
  const history = useNavigate();
  const host = `http://localhost:5000`; // Use a safe port like 5000
  const [list_Of_Users, Set_list_Of_users] = useState([]);

  const [user, setUser] = useState("")
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

  return (
    <div className='container' style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px'}}>

      {list_Of_Users.map((e, i) => (
        (user.name!==list_Of_Users[i].name) && (e._id !== undefined) && <ChatMember key={e._id} post={list_Of_Users[i]} i={i} />
        
      ))}

      <div className='container'><ChatMessages/></div>
    </div>
  );
}

export default Chat;
