import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { register } from "../utils/auth";

function Register({ handleShowInfoMessage }) {
  const [inputs, setInputs] = React.useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange({ target }) {
    setInputs((state) => ({ ...state, [target.name]: target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    register(inputs)
      .then((res) => {
        handleShowInfoMessage({
          text: "Вы успешно зарегестрировались!",
          isSuccess: true,
        });
        e.target.reset();
        navigate("/sign-in");
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
        <Link className="header__link" to={"/sign-in"}>
          Войти
        </Link>
      </Header>
      <div className="login">
        <h1 className="login__title">Регистрация</h1>
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
          <button className="login__submit">Зарегистрироваться</button>
        </form>
        <span className="login__text">
          Уже зарегестрированы?{" "}
          <Link className="login__link" to={"/sign-in"}>
            Войти
          </Link>
        </span>
      </div>
    </>
  );
}

export { Register };
