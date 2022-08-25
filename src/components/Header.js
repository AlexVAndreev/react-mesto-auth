import React, { useState } from "react";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import logo from "../images/logo.svg";
import api from "../utils/Api";

function Header() {
  const history = useHistory();
  const [email, setEmail] = useState("");

  function signOut() {
    localStorage.removeItem("jwt");
    setEmail("");
    history.push("/sign-in");
  }

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        console.log(res);
        setEmail(res.data.email);
      })
      .catch((e) => console.log(e.message));
  }, []);

  return (
    <header className="header">
      <img src={logo} alt="логотип" className="header__logo" />

      <div className="header__info">
        <Switch>
          <Route exact path="/">
            <p className="header__mail">{email}</p>
            <Link to="/sign-in" onClick={signOut} className="header__button">
              Выход
            </Link>
          </Route>

          <Route path="/sign-in">
            <Link to="/sign-up" className="header__button">
              Регистрация
            </Link>
          </Route>

          <Route path="/sign-up">
            <Link to="sign-in" className="header__button">
              Войти
            </Link>
          </Route>
        </Switch>
      </div>
    </header>
  );
}

export default Header;
