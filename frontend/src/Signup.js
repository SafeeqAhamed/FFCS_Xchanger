import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
                email: '',
                password: '',
                confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  if (!form.email.endsWith('@vitstudent.ac.in')) {
    return setError('Only VIT student emails are allowed.');
  }

  if (form.password !== form.confirmPassword) {
    return setError('Passwords do not match.');
  }

  try {
    const res = await fetch('https://ffcs-xchanger-1.onrender.com/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Registration failed.');
    } else {
      alert('Registration successful! Please login.');
      navigate('/login');
    }

  } catch (err) {
    setError('Something went wrong. Please try again.');
  }
};


  return (
    <div className="container" style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>Sign Up (VIT Students Only)</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="VIT Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ marginTop: '10px' }}>Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
