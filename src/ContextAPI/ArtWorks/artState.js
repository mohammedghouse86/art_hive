import ArtContext from "./artContext";
import { useState, useEffect } from "react";

const ArtState = (props) => {
  const host = `http://localhost:5000`; // Use a safe port like 5000
  const [art_post, setArtPost] = useState([]);
  const [comment, setComment] = useState([]);
  const [likes, setLikes] = useState("1")

  // Fetching all posts function
  const getPost = async () => {
    try {
      const response = await fetch(`${host}/api/upload/fetchallpost`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });
      const res_json = await response.json();
      //console.log("Fetched posts: ", res_json); // Verify fetched data
      setArtPost(res_json)
    } catch (error) {
      console.error("Failed to fetch posts: ", error);
    }
  };

  const getComment = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/upload/fetchallcomments`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });


      const data = await response.json();
      setComment(data);
      //console.log(data);

    } catch (error) {
      console.error("Error fetching comments API:", error);
    }
  };

  // Fetching the total likes by using artpostID
  const getLikes = async (id) => {
    try {
      const response = await fetch(`${host}/api/upload/fetchAllLikes/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });
      const res_json = await response.json();
      return res_json.length;
    } catch (error) {
      console.error("Failed to fetch likes: ", error);
      return 0;
    }
  };

  // Posting a comment on a artpost
  const postComment = async (id, comment_1) => {
    try {
      const response = await fetch(`${host}/api/upload/file_addComment/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({
          "comment": comment_1
        })
      });
      const res_json = await response.json()
      //console.log(res_json)
      setComment(comment.concat(res_json))
    }
    catch (error) {
      console.error("Failed to fetch likes: ", error);
      return 0;
    }
  };

  // Fetching the total likes by using artpostID
  const addLikes = async (id) => {
    try {
      const response = await fetch(`${host}/api/upload/file_addlike/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        } // user - from auth-token and post from param.id

      });
      const res_json = await response.json();
      //console.log(res_json);
    } catch (error) {
      console.error("Failed to fetch likes: ", error);
      return 0;
    }
  };

  // Checking if the dude liked a pic or not
  const did_like_q = async (postID) => {   
    try {
      const response = await fetch(`${host}/api/upload/did_user_like/${postID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        } // user - from auth-token and post from param.id

      });
      const res_json = await response.json();
      if (res_json.length<1){
      return (false)} //retun user has not liked the post so now you can like it
      else {
      return (true)//retun user has liked the post so now you can dislike it
      }
    } catch (error) {
      console.error("Failed to fetch likes: ", error);
      return 0;
    }
  };

  // Removing a like
  const delete_like = async (id) => {
    try {
      const response = await fetch(`${host}/api/upload/file_removelike/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        } // user - from auth-token and post from param.id

      });
      
    } catch (error) {
      console.error("Failed to fetch likes: ", error);
      return 0;
    }
  };
  const [activatemsg,setActivatemsg]=useState(false)


  // Activating the chat message
  const activate_chat = async (id) => {
    try {
          if(activatemsg===false){setActivatemsg(true)}
          else{setActivatemsg(true)}
        }  catch (error) {
      console.error("Failed to activate chat window ", error);
      return 0;
    }
  };

  const [chatbuddy,setChatbuddy]=useState([])
    // sending the site members details with whome the user wants to chat
    const sent_chat_buddy = async (user) => {
      try {
            setChatbuddy(user)
          }  catch (error) {
        console.error("Failed to activate chat window ", error);
        return 0;
      }
    };




  return (
    <ArtContext.Provider value={{ sent_chat_buddy, chatbuddy,activate_chat, activatemsg, setActivatemsg, art_post, delete_like, did_like_q, addLikes, setArtPost, getPost, comment, setComment, getComment, getLikes, likes, postComment }}>
      {props.children}
    </ArtContext.Provider>
  );
};

export default ArtState;
