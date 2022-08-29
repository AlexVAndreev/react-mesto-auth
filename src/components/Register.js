import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import * as auth from "../utils/auth";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    auth
      .register(password, email)
      .then((res) => {
        props.notify();
        props.popup();
      })
      .catch((err) => {
        history.push("/sign-up")
        console.log(
          "Что-то пошло не так!" || err.message[0].messages[0].message
        );
        props.popup(false);
      });
  };

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
