import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const AddPost = () => {
    let history = useNavigate();
    let token = localStorage.getItem('token')
    const [Credential, SetCredential] = useState({ filename: "", contentType: "", tag: "" })
    useEffect(() => {
        if (localStorage.getItem('token')) {
        }
        else {
            history("/login")
        }
    }, []);

    const fun_add_post = async(e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/upload/art", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
            body: JSON.stringify({ filename: Credential.filename, contentType: Credential.contentType, tag: Credential.tag,  imageBase64: imageBase64 })
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            alert("POST UPLOADED")
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
        <div>
            <form onSubmit={fun_add_post}>
                <h2>Upload The Photo</h2>
                <input type="file" accept="image/jpeg,image/jpg,image/png" onChange={convertImageToBase64} />
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <div className="mb-3">
                    <label htmlFor="filename" className="form-label mx-5">Post Description</label>
                    <input type="text" className="form-control mx-5" id="filename" aria-describedby="filename" onChange={onChange} name="filename" value={Credential.filename} />
                </div>
                <div className="mb-3">
                    <label htmlFor="contentType" className="form-label mx-5">Content Type</label>
                    <input type="text" className="form-control mx-5" id="contentType" aria-describedby="contentType" onChange={onChange} name="contentType" value={Credential.contentType} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label mx-5">Tag</label>
                    <input type="text" className="form-control mx-5" id="tag" aria-describedby="tag" onChange={onChange} name="tag" value={Credential.tag} />
                </div>
                <button type="submit" className="btn btn-primary  mx-5">POST</button>
            </form>
        </div>
    )
}

export default AddPost
