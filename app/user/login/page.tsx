"use client";

import {useState} from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const jsonData = await response.json();
      localStorage.setItem("token", jsonData.token);
      alert(jsonData.message);
    } catch (e) {
      console.log(e);
      alert("Failed login.");
    }
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email"
               placeholder="your email"
               required/>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" name="password"
               placeholder="your password" required/>
        <button>login</button>
      </form>
    </div>
  );
};

export default Login;