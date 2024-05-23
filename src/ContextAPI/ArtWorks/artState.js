import ArtContext from "./artContext";
import { useState, useEffect } from "react";

const ArtState = (props) => {
  const host = `http://localhost:5000`; // Use a safe port like 5000
  const [art_post, setArtPost] = useState([]);

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


  return (
    <ArtContext.Provider value={{ art_post, setArtPost, getPost }}>
      {props.children}
    </ArtContext.Provider>
  );
};

export default ArtState;
