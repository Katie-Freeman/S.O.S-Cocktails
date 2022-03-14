import React, { useState } from "react";

function Register(props) {
  const [user, setUser] = useState({});
  const handleTextChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = () => {
    fetch("http://localhost:8080/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      });
  };

  return (
    <div className="register container">
      <h1>Register</h1>
      <input
        type="text"
        onChange={handleTextChange}
        placeholder="Enter username"
        name="username"
      />
      <input
        type="password"
        onChange={handleTextChange}
        placeholder="Enter Password"
        name="password"
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
