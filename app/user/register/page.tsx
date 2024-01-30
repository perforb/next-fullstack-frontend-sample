"use client";

import {useState} from "react";
import process from "process";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/register`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });
      const jsonData = await response.json();
      alert(jsonData.message);
    } catch (e) {
      console.log(e);
      alert("Failed to register a user.");
    }
  };
  return (
    <div>
      <h1 className="page-title">User registration</h1>
      <form onSubmit={handleSubmit}>
        <input value={name}
               onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder="your name"
               required/>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email"
               placeholder="your email"
               required/>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" name="password"
               placeholder="your password" required/>
        <button>register</button>
      </form>
    </div>
  );
};

export default Register;