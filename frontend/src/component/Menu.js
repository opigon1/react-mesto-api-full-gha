import React from "react";
import { Link } from "react-router-dom";

function Menu({ email, onLogout, active }) {
  return (
    <div
      className={
        active
          ? "header header_type_menu header_type_menu_opened"
          : "header header_type_menu"
      }
    >
      <p className="header__mail">{email}</p>
      <Link
        to={"/sign-in"}
        className={
          active ? "header__link header__link_type_burger" : "header__link"
        }
        onClick={onLogout}
      >
        Выйти
      </Link>
    </div>
  );
}

export { Menu };
