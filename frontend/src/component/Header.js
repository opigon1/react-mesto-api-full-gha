import React from "react";
import logo from "../images/logo.svg";

function Header({ children }) {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="Логотип" />
      {children}
    </header>
  );
}

export { Header };
