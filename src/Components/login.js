import React, {useContext, useState} from 'react'
import ArtContext from "../ContextAPI/ArtWorks/artContext";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const context = useContext(ArtContext);
  const [Credential, SetCredential] = useState({ email: "", password: "" })
  //const {alert,setAlert} = context; {/* ADDING ALERT FROM CONTEX API*/}
  let history = useNavigate();
  /*
  const onSuccess = () => {
    setAlert({status:true,message:`logged in...`});
    console.log(alert);
    setTimeout(()=>{
      setAlert({status:null,message:``});
      history("/"); // it rerouts us to the home page 
    },1500);
  }
*/
  const Submit_Login_Form = async (e) => {
    e.preventDefault();
    //console.log('email=',Credential.email,'password=',Credential.password)
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: Credential.email, password: Credential.password })
    });
    
    const json = await response.json()
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      //onSuccess();
      history("/"); // it rerouts us to the home page 
    }
    else {
      alert("Invalid credentials");
    }
  }

  const onChange = (e) => {
    SetCredential({ ...Credential, [e.target.name]: e.target.value })
  }

  return (
    <div className="mx-auto p-2" style={{ "width": "80vw" }}>
      <form onSubmit={Submit_Login_Form}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label mx-5">Email address</label>
          <input type="email" className="form-control mx-5" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={Credential.email} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label mx-5">Password</label>
          <input type="password" className="form-control mx-5" id="Password" onChange={onChange} value={Credential.password} name="password"/>

        </div>
        <button type="submit" className="btn btn-primary  mx-5">LOGIN</button>
      </form>
    </div>
  )
}

export default Login

