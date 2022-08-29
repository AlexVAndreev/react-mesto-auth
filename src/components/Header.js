import React, { useState } from "react";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import logo from "../images/logo.svg";

function Header(props) {
  return (
    <header className="header">
      <img src={logo} alt="логотип" className="header__logo" />
      <div className="header__info">
        <Switch>
          <Route exact path="/">
            <p className="header__mail">{props.email}</p>
            <Link
              to="/sign-in"
              onClick={props.signOut}
              className="header__button"
            >
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
