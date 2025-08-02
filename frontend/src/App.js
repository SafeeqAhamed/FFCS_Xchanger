import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; //These are from react-router-dom for handling routing.
import Login from './Login';
import Signup from './Signup'; 
import FormPage from './FormPage';
import Home from './Home';  
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('token')); //checks local storage to see if a token is stored.
                       //!! converts the token string to a boolean (true if token exists, false otherwise).
                       //	Set the initial value  
 useEffect(() => {         //optional-Update value if anything changed in storage
    setIsLoggedIn(!!localStorage.getItem('token')); 
  }, []);                //only once 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* ✅ Home Page */}
        <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} /> 
         {/*onLogin is a prop passed to the Login component-() => Sets isLoggedIn to true*/} 
        <Route path="/signup" element={<Signup />} />
        <Route path="/form" element={isLoggedIn ? <FormPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
