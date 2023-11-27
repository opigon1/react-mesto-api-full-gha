import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Main } from "./Main";
import { PopupWithForm } from "./PopupWithForm";
import { ImagePopup } from "./ImagePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { EditProfilePopup } from "../component/EditProfilePopup";
import { EditAvatarPopup } from "./EditAvatarPopup";
import { InfoTooltip } from "./InfoTooltip";
import { AddPlacePopup } from "./AddPlacePopup";
import { Register } from "./Register";
import { Login } from "./Login";
import { ProtectedRoute } from "./ProtectedRoute";
import { checkToken } from "../utils/auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [infoMessage, setInfoMessage] = React.useState(null);
  const [isLogged, setIsLogged] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [email, setEmail] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLogged) {
      api
        .getAllInfo()
        .then(([cardData, userData]) => {
          setCurrentUser(userData.data);
          setCards(cardData.data);
        })
        .catch((err) => console.log(err));
    }
  }, [isLogged]);

  React.useEffect(() => {
    checkToken()
      .then((data) => {
        console.log(data);
        setEmail(data.email);
        setIsLogged(true);
        navigate("/");
      })
      .catch((err) => console.log(err));
  }, [isLogged]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setInfoMessage(null);
  }

  function handleUpdateUser(data) {
    api
      .editUserInfo({ name: data.name, about: data.about })
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(data) {
    api
      .editUserAvatar({ avatar: data.avatar })
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .handleLikeCard(card._id, isLiked)
      .then((res) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? res.data : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((res) => console.log(res));
  }

  function handleAddPlace(data) {
    api
      .addCard({ name: data.name, link: data.link })
      .then((newCard) => {
        setCards((cards) => [newCard.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleShowInfoMessage(message) {
    setInfoMessage(message);
  }

  function handleLogin() {
    setIsLogged(false);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setEmail("");
    setIsLogged(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              element={Main}
              onAddPlace={handleAddPlaceClick}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              isLogged={isLogged}
              email={email}
              onLogout={handleLogout}
            />
          }
        />
        <Route
          path="/sign-up"
          element={<Register handleShowInfoMessage={handleShowInfoMessage} />}
        />
        <Route
          path="/sign-in"
          element={
            <Login
              handeShowInfoMessage={handleShowInfoMessage}
              onLogin={handleLogin}
            />
          }
        />
      </Routes>

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlace}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <PopupWithForm name="delete" title="Вы уверены" children="" />
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        isOpen={isImagePopupOpen}
      />
      <InfoTooltip onClose={closeAllPopups} message={infoMessage} />
    </CurrentUserContext.Provider>
  );
}

export default App;
