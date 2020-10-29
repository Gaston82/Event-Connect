import React, { useState } from "react";
import { loginUser } from "../logic/User";
import { useHistory, Link } from "react-router-dom";
import "./Login.scss";
import { useForm } from "../hooks/useForm";

const Login = () => {
  const [formValues, handleInputChange] = useForm({
    email: "",
    password: "",
  });

  const { email, password } = formValues;

  const [error, setError] = useState("");

  const history = useHistory();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email y Password obligatorios");
      return;
    }

    const result = await loginUser(email, password);

    if (!result.succes) {
      setError(result.message);
    } else {
      history.push("/home");
    }
  };

  return (
    <div className="wrapper">
      <form className="form-login" onSubmit={handleFormSubmit}>
        <h1>Login </h1>
        <label htmlFor="email">Email</label>
        <br></br>
        <input
          type="text"
          name="email"
          value={email}
          onChange={handleInputChange}
          placeholder="Enter email"
          autoComplete="off"
        />
        <br></br>
        <label htmlFor="password">Password</label>
        <br></br>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleInputChange}
          placeholder="password"
          autoComplete="off"
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
    </div>
  );
};

export default Login;
