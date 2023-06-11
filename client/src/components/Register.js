import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "http://localhost:5000/api/v1/users/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      }
    );
    const json = await response.json();
    if (json.success) {
      navigate("/");
    } else {
      setShowAlert(true);
      setAlert(json.message);
      setTimeout(() => {
        setShowAlert(false);
      }, 1500);
    }
  };
  return (
    <div className>
      <div className="login-register">
        <p>iNoteBook Register</p>
      </div>
      {showAlert && <Alert message={alert} />}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Username</label>
        <br />
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          min="6"
        />
        <br />
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          min="8"
        />
        <br />
        <button>Register</button>
        <p>
          Already a User ?
          <Link to="/">
            <b> Login</b>
          </Link>
        </p>
      </form>
    </div>
  );
}
