import React from "react";

function Login({ authorize }) {
  const [emailValue, setEmailValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");

  function handleSubmit(evt) {
    evt.preventDefault();

    const password = passwordValue;
    const email = emailValue;

    authorize(email, password);
  }

  return (
    <form onSubmit={handleSubmit} className="login-data">
      <p className="login-data__title">Вход</p>
      <input
        className="login-data__input"
        placeholder="Email"
        type="email"
        value={emailValue}
        onChange={(evt) => setEmailValue(evt.target.value)}
      ></input>
      <input
        className="login-data__input"
        placeholder="Пароль"
        type="password"
        value={passwordValue}
        onChange={(evt) => setPasswordValue(evt.target.value)}
      ></input>
      <button className="login-data__button">Войти</button>
    </form>
  );
}

export default Login;
