import React, { useContext, useEffect } from 'react'
import ArtContext from "../ContextAPI/ArtWorks/artContext";
import { formatDistanceToNow } from 'date-fns';

const ChatPost = (post) => {
  const context = useContext(ArtContext);
  const { chatbuddy, Login_User_name } = context;
  console.log("this is chat post =", post.post._id);
  console.log("this is whome you are taking to =", chatbuddy.name, chatbuddy._id);
  const handleDelete = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/chat/removeChat/${post.post._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const json = await response.json()
    console.log(json);
  }

return (
  <>
    <div className='card d-flex flex-row mb-3'>
      <div className="p-2">
        <div className="text-start my-1" style={{ marginLeft: "10px" }}>
          {post.post.chatWithUser_1 === chatbuddy._id ? chatbuddy.name : Login_User_name} - {post.post.message} - {formatDistanceToNow(new Date(post.post.date))}  ago
          <button type='button' onClick={handleDelete} className="btn btn-danger mx-2"><i className="fas fa-trash-alt"></i></button>
        </div>
      </div>
    </div>
  </>
)
}

export default ChatPost
