import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './Components/About';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import './App.css'; // Importing CSS styles

function App() {
  return (
    <>

        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Router>

    </>
  );
}

export default App;
