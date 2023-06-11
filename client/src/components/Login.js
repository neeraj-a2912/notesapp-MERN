import React, { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "./Alert";
import { useNavigate } from "react-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");
  let navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("auth-token", json.token);
      navigate("/home");
      setAlert(json.message);
    } else {
      setShowAlert(true);
      setAlert(json.message);
      setTimeout(() => {
        setShowAlert(false);
      }, 1500);
    }
  };
  return (
    <div>
      <div className="login-register">
        <p>iNoteBook Login</p>
      </div>
      {showAlert && <Alert message={alert} />}
      <form onSubmit={handleSubmit}>
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
        />
        <br />
        <button>Login</button>
        <p>
          Don't have an Account ?{" "}
          <Link to="/register">
            <b>Register</b>
          </Link>
        </p>
      </form>
    </div>
  );
}
