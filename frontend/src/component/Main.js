import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Card } from "./Card";
import { Menu } from "./Menu";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Link } from "react-router-dom";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  cards,
  onCardClick,
  onCardLike,
  onCardDelete,
  email,
  onLogout,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [menuActive, setMenuActive] = React.useState(false);

  return (
    <>
      <Menu
        email={currentUser.email}
        onLogout={onLogout}
        active={menuActive}
        setActive={setMenuActive}
      />
      <Header>
        <button
          className={
            "header__menu" + (menuActive ? " header__menu_opened" : "")
          }
          onClick={() => setMenuActive(!menuActive)}
        ></button>
        <div className="header__wrapper">
          <p className="header__mail">{currentUser.email}</p>
          <Link
            to={"/sign-in"}
            className="header__link header__link_position_main"
            onClick={onLogout}
          >
            Выйти
          </Link>
        </div>
      </Header>
      <main className="main">
        <section className="profile">
          <div className="profile__avatar-cover" onClick={onEditAvatar}>
            {/* {console.log(currentUser.avatar)} */}
            <img
              src={currentUser.avatar}
              alt="Аватарка"
              className="profile__avatar"
            />
          </div>
          <div className="profile__info">
            {/* {console.log(currentUser.name)} */}
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__status">{currentUser.about}</p>
            <button
              className="profile__edit-button"
              type="button"
              onClick={onEditProfile}
            ></button>
          </div>
          <button
            className="profile__add-button"
            type="button"
            onClick={onAddPlace}
          ></button>
        </section>
        <section className="elements-section">
          <ul className="elements">
            {Array.isArray(cards) &&
              cards.map((card) => (
                <Card
                  card={card}
                  onCardClick={onCardClick}
                  key={card._id}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}
                />
              ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}

export { Main };
