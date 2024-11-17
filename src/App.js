import React, { useState } from "react";
import LandingPage from "./components/LandingPage/landingpage";
import Game from "./components/Game/Game";
import LoginForm from "./components/Auth/LoginForm";
import SignUpForm from "./components/Auth/SignUpForm";

const App = () => {
  const [view, setView] = useState("landing");

  const handleGuestPlay = () => setView("game");
  const handleLogin = () => setView("login");
  const handleSignUp = () => setView("signup");

  return (
    <div className="App">
      {view === "landing" && (
        <LandingPage
          onGuestPlay={handleGuestPlay}
          onLogin={handleLogin}
          onSignUp={handleSignUp}
        />
      )}
      {view === "game" && <Game />}
      {view === "login" && <LoginForm />}
      {view === "signup" && <SignUpForm />}
    </div>
  );
};

export default App;
