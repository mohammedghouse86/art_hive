import React, { useContext, useEffect, useState } from 'react'
import ArtContext from "../ContextAPI/ArtWorks/artContext";

const User_loggedIn = () => {
    const context = useContext(ArtContext);
    const { setLoggedInUser_name } = context;
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
                setLoggedInUser_name(data); // context API
                //console.log('this is the response', data);
            }
            catch (error) {
                console.error('catch error', error);
            }
        }
        fun_user();
    }, [])
    return (
        <div>
            {user.imageBase64? 
            <div>
            <img src={`${user.imageBase64}`} alt={user.name} style={{ width: '45px', height: '30px', borderRadius:'50%', border:'2px solid red'}} />
              {user.name}
             </div>:<div>...LOADING</div>} 
        </div>
    )
}

export default User_loggedIn
