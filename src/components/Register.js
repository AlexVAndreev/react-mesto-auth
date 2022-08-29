import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import * as auth from "../utils/auth";

function Register({ register }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    register(email, password);
  }

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="login-data">
      <p className="login-data__title">Регистрация</p>
      <input
        className="login-data__input"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(evt) => setEmail(evt.target.value)}
        required
      ></input>
      <input
        className="login-data__input"
        placeholder="Пароль"
        type="password"
        value={password}
        onChange={(evt) => setPassword(evt.target.value)}
        required
      ></input>
      <button className="login-data__button">Зарегистрироваться</button>
    </form>
  );
}

export default Register;
