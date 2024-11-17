import React from "react";
import "./LandingPage.css";

const LandingPage = ({ onGuestPlay, onLogin, onSignUp }) => {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <h1>TypeKita</h1>
        <p>Test your typing speed and accuracy!</p>
      </header>
      <div className="button-group">
        <button onClick={onGuestPlay} className="guest-play-btn">
          Play as Guest
        </button>
        <button onClick={onLogin} className="login-btn">
          Login
        </button>
        <button onClick={onSignUp} className="signup-btn">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
