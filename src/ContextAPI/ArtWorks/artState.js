import ArtContext from "./noteContext";
import { useState } from "react";
const ArtState = (props) => {

  const host = `http://localhost:6000`
  const mongoDB_user_uploaded_post = [];
  const [art_post, setArtPost] = useState(mongoDB_user_uploaded_post);

  //FETCHING ALL NOTES FUNCTION
  const getPost = async () => {
    // API-CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const res_json = await response.json()
    //console.log(res_json)
    setNotes(res_json);
  }
}