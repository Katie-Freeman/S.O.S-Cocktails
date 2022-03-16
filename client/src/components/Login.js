import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import GuestLogin from "./GuestLogin";

function Login(props) {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const handleTextChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("LOGING IN", result);
        if (result.success) {
          const token = result.token;
          console.log("USER", user);
          localStorage.setItem("username", user.username);
          localStorage.setItem("userId", result.user.id);
          localStorage.setItem("jsonwebtoken", token);
          props.onLogin(token);
          navigate("/");
        } else {
        }
      });
  };

  return (
    <div className="login container">
      <h1>Login</h1>
      <input
        type="text"
        onChange={handleTextChange}
        placeholder="Enter Username"
        name="username"
      />
      <input
        type="password"
        onChange={handleTextChange}
        placeholder="Enter Password"
        name="password"
      />
      <button onClick={handleLogin}>Login</button>
      <GuestLogin/>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (token) => dispatch({ type: "ON_AUTH", payload: token }),
  };
};

export default connect(null, mapDispatchToProps)(Login);
