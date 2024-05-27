import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import logo from '../img/ArtHive_LOGO.jpg';
import { useNavigate } from 'react-router-dom';
import User_loggedIn from './user_loggedIn'

const Navbar = () => {
  let history = useNavigate();
  let location = useLocation();
  useEffect(() => {
  }, [location]);
  const fun_Logout = () => {
    localStorage.clear();
    history("/login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand">
            <img src={logo} alt="ArtHive LOGO" style={{ "height": "50px", "width": "150px", "borderRadius": "30px" }} />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active p-1 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3" : ""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/About" ? "active p-1 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3" : ""}`} to="/About">About</Link>
              </li>
            </ul>
            {!localStorage.getItem('token') ? <div className='d-flex flex-row-reverse'><div className="p-2">
              <Link className={`nav-link ${location.pathname === "/login" ? "active p-1 text-primary-emphasis bg-light-subtle border border-primary-subtle rounded-3" : "navbar-nav me-auto mb-2 mb-lg-0"}`} aria-current="page" to="/login">LogIn</Link>
            </div>
              <div className="p-2">
                <Link className={`nav-link ${location.pathname === "/signup" ? "active p-1 text-primary-emphasis bg-light-subtle border border-primary-subtle rounded-3" : "navbar-nav me-auto mb-2 mb-lg-0"}`} aria-current="page" to="/signup">SignUp</Link>
              </div></div> : 
              <div className='d-flex align-items'>
                
                <button type='button' className="btn btn-outline-warning mx-1 disabled"><User_loggedIn /></button><button type='button' className="btn btn-danger mx-1" onClick ={fun_Logout}> LOG OUT</button>
              </div>}
          </div>
        </div>
      </nav >
    </>
  )
}

export default Navbar
