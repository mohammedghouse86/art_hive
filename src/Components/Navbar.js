import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../img/ArtHive_LOGO.jpg';
import { useNavigate } from 'react-router-dom';
import User_loggedIn from './user_loggedIn';
import './Navbar.css'; // Import custom CSS for vertical navbar

const Navbar = () => {
  let history = useNavigate();
  let location = useLocation();
  useEffect(() => {}, [location]);

  const fun_Logout = () => {
    localStorage.clear();
    history("/login");
  };

  return (
    <nav className="card navbar fixed-left bg-transparent full-height-navbar">
      <div className="container-fluid d-flex flex-column align-items-start h-100">
        <a className="navbar-brand mt-3">
          <img src={logo} alt="ArtHive LOGO" style={{ height: '50px', width: '150px', borderRadius: '30px' }} />
        </a>
        <ul className="navbar-nav flex-column mt-4 w-100   me-auto mb-2 mb-lg-0">
          <li className="nav-item w-100">
          <Link className={`nav-link ${location.pathname === "/" ? "active p-1 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3" : ""}`} aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item w-100">
            <Link className={`nav-link ${location.pathname === "/addpost" ? "active p-1 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3" : ""}`} to="/addpost">Add Post</Link>
          </li>
          <li className="nav-item w-100">
          <Link className={`nav-link ${location.pathname === "/About" ? "active p-1 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3" : ""}`} to="/About">About</Link>
          </li>
        </ul>
        <div className="mt-auto w-100">
          {!localStorage.getItem('token') ? (
            <>
              <Link className={`nav-link ${location.pathname === "/login" ? "active p-1 text-primary-emphasis bg-light-subtle border border-primary-subtle rounded-3" : "navbar-nav me-auto mb-2 mb-lg-0"}`} aria-current="page" to="/login">LogIn</Link>

              <Link className={`nav-link ${location.pathname === "/signup" ? "active p-1 text-primary-emphasis bg-light-subtle border border-primary-subtle rounded-3" : "navbar-nav me-auto mb-2 mb-lg-0"}`} aria-current="page" to="/signup">SignUp</Link>
            </>
          ) : (
            <>
              <button type="button" className="btn btn-outline-warning my-1 disabled"><User_loggedIn /></button>
              <button type="button" className="btn btn-danger my-1" onClick={fun_Logout}>LOG OUT</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
