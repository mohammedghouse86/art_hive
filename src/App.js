import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './Components/About';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import './App.css'; // Importing CSS styles
import Signup from './Components/signup';

function App() {
  return (
    <>

        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Router>

    </>
  );
}

export default App;
