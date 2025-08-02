import React, { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom'; 
 
function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // ← Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validate VIT email
    if (!email.endsWith('@vitstudent.ac.in')) {
      setError('Only VIT student emails are allowed.');
      return;
    }

    try {                       //req ula poi 
      const res = await fetch('https://ffcs-xchanger-v8b8.onrender.com/api/auth/login', {
        method: 'POST',                        // sending data 
        headers: { 'Content-Type': 'application/json' },  //we tell the backend: “I’m sending JSON data (not form or plain text).”
        body: JSON.stringify({ email, password }), //convert the email and password into a JSON string
      });

      const data = await res.json(); //raw text to a JavaScript object (data

      if (res.ok) {
                localStorage.setItem('token', data.token);
                console.log("Token saved, logging in...");
                onLogin();
                navigate('/form'); // ← Redirect to form page
                 } 
      else                                               //❌ If fail: shows error.
        {setError(data.error || 'Login failed');
        console.log("Login error:", data.error);}

    } catch (err) 
        {console.error(err);
        setError('Server error. Try again later.');}   //⚠️ If server crashes: shows server error.  
    
  };

   const goToSignup = () => {
    navigate('/signup'); // 🔀 redirect to signup page
  };
  return (
    <div className="container">
      <h2>Login (VIT Students Only)</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="VIT Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
         <button type="button" onClick={goToSignup} style={{ marginTop: '10px' }}>
          Sign Up
        </button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        <p align="center" style={{ marginTop: '30px', fontStyle: 'italic', color: '#555' }}>
        “Empowering students to take control of their schedules”
        </p>    
    </div>
  );
}

export default Login;
