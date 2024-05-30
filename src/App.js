import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './Components/About';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import './App.css'; // Importing CSS styles
import Signup from './Components/signup';
import Login from './Components/login';
import AddPost from './Components/AddPost';
import Chat from './Components/Chat';

function App() {
  return (
    <>
      <Router>
        <div className="container text-center">
          <div className="row">
            <Navbar />
            <div className="col">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/addpost" element={<AddPost />} />
                <Route path="/chat" element={<Chat />} />
              </Routes>
            </div></div></div>
      </Router>
    </>
  );
}
export default App;
