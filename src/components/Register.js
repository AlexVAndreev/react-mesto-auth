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
    <form onSubmit={handleSubmit} autoComplete="off" className="user-data">
      <p className="user-data__title">Регистрация</p>
      <input
        className="user-data__input"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(evt) => setEmail(evt.target.value)}
        required
      ></input>
      <input
        className="user-data__input"
        placeholder="Пароль"
        type="password"
        value={password}
        onChange={(evt) => setPassword(evt.target.value)}
        required
      ></input>
      <button className="user-data__button">Зарегистрироваться</button>
      <div className="user-data__string">
        <span className="user-data__question">Вы уже зарегистрированы?</span>
        <Link to="sign-in" className="user-data__question-button">
          Войти
        </Link>
      </div>
    </form>
  );
}

export default Register;
