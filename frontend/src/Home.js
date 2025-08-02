import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="hero-title">FFCS XCHANGER</h1>
      <p className="hero-subtitle">
        End the WhatsApp chaos! Find perfect faculty swaps with fellow VIT students in seconds.
        <br /> Smart matching, instant connections, seamless experience.
      </p>

      <button className="get-started-btn" onClick={() => navigate('/login')}>
        Get Started
      </button>

      <div className="features">
        <h2>Why Choose Our Platform?</h2>
        <ul>
          <li><strong>Easy Swap Requests:</strong> List your current and desired faculty with just a few clicks.</li>
          <li><strong>Smart Matching:</strong> Our algorithm finds perfect mutual matches automatically.</li>
          <li><strong>Connect Instantly:</strong> Get connected with matching students immediately.</li>
          <li><strong>Real-time Notifications:</strong> Never miss a perfect swap opportunity.</li>
        </ul>
      </div>

  <div className="stats">
        <div className="stat-card">
                    <div className="stat-number">500+</div>
                    <div className="stat-label">Successful Swaps</div>
        </div>
        <div className="stat-card">
                <div className="stat-number">1,200+</div>
                <div className="stat-label">Active Students</div>
        </div>
        <div className="stat-card">
                <div className="stat-number">98%</div>
                <div className="stat-label">Success Rate</div>
        </div>
  </div>


      <p className="join-message">Ready to Find Your Perfect Swap?</p>
      <button className="signup-btn" onClick={() => navigate('/signup')}>
        Join Now
      </button>
    </div>
  );
}

export default Home;
