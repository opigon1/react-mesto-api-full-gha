import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { authorize } from "../utils/auth";

function Login({ handleShowInfoMessage, onLogin }) {
  const [inputs, setInputs] = React.useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange({ target }) {
    setInputs((state) => ({ ...state, [target.name]: target.value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    authorize(inputs)
      .then((res) => {
        event.target.reset();
        onLogin();
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        handleShowInfoMessage({
          text: "Что-то пошло не так! Попробуйте еще раз.",
          isSuccess: false,
        });
      });
  }

  return (
    <>
      <Header>
        <Link className="header__link" to={"/sign-up"}>
          Регистрация
        </Link>
      </Header>
      <div className="login">
        <h1 className="login__title">Вход</h1>
        <form className="login__form" onSubmit={handleSubmit}>
          <label className="login__label" htmlFor="email">
            <input
              className="login__input"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required
              minLength="2"
              maxLength="40"
              value={inputs.email}
              onChange={handleChange}
            />
          </label>
          <label className="login__label" htmlFor="password">
            <input
              className="login__input"
              type="password"
              name="password"
              id="password"
              placeholder="Пароль"
              required
              minLength="2"
              maxLength="40"
              value={inputs.password}
              onChange={handleChange}
            />
          </label>
          <button className="login__submit">Войти</button>
        </form>
      </div>
    </>
  );
}

export { Login };
