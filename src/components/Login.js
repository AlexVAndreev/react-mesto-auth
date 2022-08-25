import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import * as auth from "../auth";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const resetForm = () => {
    setPassword("");
    setEmail("");
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (!email || !password) {
      return;
    }

    auth
      .authorize(password, email)
      .then((res) => {
        resetForm();
        props.onAuth();
        history.push("/profile");
      })
      .catch((error) => {
        console.log(
          "Что-то пошло не так!" || error.message[0].messages[0].message
        );
      });
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="user-data">
      <p className="user-data__title">Вход</p>
      <input
        className="user-data__input"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(evt) => setEmail(evt.target.value)}
      ></input>
      <input
        className="user-data__input"
        placeholder="Пароль"
        type="password"
        value={password}
        onChange={(evt) => setPassword(evt.target.value)}
      ></input>
      <button className="user-data__button">Войти</button>
      <div className="user-data__string">
        <span className="user-data__question">Еще не зарегистрированы?</span>
        <Link to="sign-up" className="user-data__question-button">
          Регистрация
        </Link>
      </div>
    </form>
  );
}

export default Login;
