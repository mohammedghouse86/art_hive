import React, { useContext, useEffect } from 'react'
import ArtContext from "../ContextAPI/ArtWorks/artContext";
import { formatDistanceToNow } from 'date-fns';

const ChatPost = (post) => {
    const context = useContext(ArtContext);
    const { chatbuddy, Login_User_name } = context;
    console.log("this is chat post =",post.post._id);
    console.log("this is whome you are taking to =",chatbuddy.name,chatbuddy._id );
      return (
    <>
      <p className="card mx-1">
        <div className="text-start my-1" style={{ marginLeft: "10px" }}>{post.post.chatWithUser_1===chatbuddy._id?chatbuddy.name:Login_User_name} - {post.post.message} - {formatDistanceToNow(new Date(post.post.date))}  ago</div></p>
    </>
  )
}

export default ChatPost
