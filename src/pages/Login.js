import React, { useState } from "react";
import { loginUser } from "../logic/User";
import { useHistory, Link } from "react-router-dom";
import "./Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  const handleFormSumit = async (event) => {
    event.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email y Password obligatorios");
      return;
    }
    const result = await loginUser(email, password);
    console.log(result);
    if (!result.succes) {
      setError(result.message);
    } else {
      history.push("/home");
    }
  };

  return (
    <>
      <form className="form-login" onSubmit={handleFormSumit}>
        <h1>Login </h1>
        <label htmlFor="email">Email</label>
        <br></br>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter name"
        />
        <br></br>
        <label htmlFor="password">Password</label>
        <br></br>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="password"
        />
        <br />
        <br />
        <button type="submit">Login</button>
        <br />
        <br />
        <br />
        <Link to={"/signup"} className="user-logo">
          <p>Don't have an account?</p>
        </Link>
      </form>
      {error !== "" && <span>{error}</span>}
    </>
  );
};

export default Login;
