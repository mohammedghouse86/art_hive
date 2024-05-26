import React, { useState, useContext } from 'react';
import ArtContext from "../ContextAPI/ArtWorks/artContext";
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const context = useContext(ArtContext);
  const { alert, setAlert } = context; {/* ADDING ALERT FROM CONTEX API*/ }
  const [Credential, SetCredential] = useState({ name: "", email: "", password: "", cpassword: "", date_of_birth:"" });
  let history = useNavigate();

  /*const onSuccess = () => {
    setAlert({status:true,message:`${Credential.name} user created`});
    console.log(alert);
    setTimeout(()=>{
      setAlert({status:null,message:``});
      
    },1500);
  }
  */
  const Submit_SignUP_Form = async (e) => {
    if(Credential.password!==Credential.cpassword)
      {
        return(alert(
            "PASSWORD DOES NOT MATCH"
        ))
      }

    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: Credential.name, email: Credential.email, password: Credential.password, date_of_birth: Credential.date_of_birth, imageBase64:imageBase64  })
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
      console.log("Invalid credentials");
    }
  }

  const onChange = (e) => {
    SetCredential({ ...Credential, [e.target.name]: e.target.value })
  }

  const [imageBase64, setImageBase64] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const convertImageToBase64 = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
      };
      reader.readAsDataURL(file);
      setErrorMessage(''); // Clear the error message if the file is valid
    } else {
      setErrorMessage('Please select a JPG or PNG file.');
    }
  }

  return (
    <div className="mx-auto p-2" style={{ "width": "80vw" }}>
      <form onSubmit={Submit_SignUP_Form}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label mx-5">Name</label>
          <input type="text" className="form-control mx-5" id="name" aria-describedby="name" onChange={onChange} name="name" value={Credential.name} />
        </div>
        <div className="mb-3">
          <label htmlFor="DOB" className="form-label mx-5">Date Of Birth</label>
          <input type="date" className="form-control mx-5" id="DOB" aria-describedby="DOB" onChange={onChange} name="date_of_birth" value={Credential.date_of_birth} />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label mx-5">Email address</label>
          <input type="email" className="form-control mx-5" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange} name="email" value={Credential.email} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label mx-5">Password</label>
          <input type="password" className="form-control mx-5" id="Password" onChange={onChange} name="password" value={Credential.password} />
          <label htmlFor="exampleInputPassword1" className="form-label mx-5">Confirm Password</label>
          <input type="password" className="form-control mx-5" id="ConfirmPassword" onChange={onChange} name="cpassword" value={Credential.cpassword} />

          <h2>Upload Your Display Photo</h2>
          <input type="file" accept="image/jpeg,image/jpg,image/png" onChange={convertImageToBase64} />
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        </div>
        <button type="submit" className="btn btn-primary  mx-5">SIGN UP</button>
      </form>
    </div>
  )
}

export default Signup

