import React from "react";
import "./LoginForm.css";

const LoginForm = () => {
  return (
    <div className="form-page">
      <div className="form">
        <h2>Welcome back!</h2>
        <input type="email" placeholder="Enter your email" className="login-input"/>
        <input type="password" placeholder="Enter your password" className="login-input"/>
        <button>Log In</button>
        <a href="#">Create an Account?</a>
      </div>
    </div>
  );
};

export default LoginForm;
