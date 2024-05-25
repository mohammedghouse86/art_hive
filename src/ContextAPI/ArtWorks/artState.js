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
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlzIjoiNjY0ZWFhZTY3YTExOTU4ZTYyMWI5Yjk5In0sImlhdCI6MTcxNjQ2ODgyMn0.FwMwWkOkkK-i1j1RwOcIq2ls1KD6vAUU6smc3UiDhGY' // Replace with the actual token
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
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlzIjoiNjY0ZWFhZTY3YTExOTU4ZTYyMWI5Yjk5In0sImlhdCI6MTcxNjQ2ODgyMn0.FwMwWkOkkK-i1j1RwOcIq2ls1KD6vAUU6smc3UiDhGY' // Replace with the actual token
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
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlzIjoiNjY0ZWFhZTY3YTExOTU4ZTYyMWI5Yjk5In0sImlhdCI6MTcxNjQ2ODgyMn0.FwMwWkOkkK-i1j1RwOcIq2ls1KD6vAUU6smc3UiDhGY' // Replace with the actual token
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
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlzIjoiNjY1MTRiY2Y1M2Q5NzNiYzU1Yjk3NzAxIn0sImlhdCI6MTcxNjYwNDI0Mn0.LINrN3pETuSEo1a0OtWkZrL43YcP3TJhtYcmDlrY1Yw' // Replace with the actual token
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




  return (
    <ArtContext.Provider value={{ art_post, setArtPost, getPost, comment, setComment, getComment, getLikes, likes, postComment }}>
      {props.children}
    </ArtContext.Provider>
  );
};

export default ArtState;
