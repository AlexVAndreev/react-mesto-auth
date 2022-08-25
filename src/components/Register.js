import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import * as auth from "../auth";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    auth
      .register(password, email)
      .then((res) => {
        history.push("/sign-in");
        props.notify();
        props.popup();
      })
      .catch((err) => {
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
      <div className="login-data__string">
        <span className="login-data__question">Вы уже зарегистрированы?</span>
        <Link to="sign-in" className="login-data__question-button">
          Войти
        </Link>
      </div>
    </form>
  );
}

export default Register;
