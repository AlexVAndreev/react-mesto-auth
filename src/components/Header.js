import React from "react";
import logoPath from "../images/logo.svg";

function Header() {
  return (
    <header className="header">
      <img src={logoPath} alt="Лого Место" className="logo" />
    </header>
  );
}
export default Header;
