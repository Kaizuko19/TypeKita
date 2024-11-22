import React from "react";
import "./LoginForm.css";

const SignUpForm = () => {
  return (
    <div className="form-page">
      <div className="form">
        <h2>Create an Account</h2>
        <input type="username" placeholder="Enter your username" className="login-input"/>
        <input type="email" placeholder="Enter your email" className="login-input"/>
        <input type="password" placeholder="Enter your password" className="login-input"/>
        <button>Sign up</button>
        <a href="#">Already have an Account?</a>
      </div>
    </div>
  );
};

export default SignUpForm;
