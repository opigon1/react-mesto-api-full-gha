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
  const [IsLogged, setIsLogged] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [email, setEmail] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (IsLogged) {
      api
        .getAllInfo()
        .then(([cardData, userData]) => {
          setCurrentUser(userData);
          setCards(cardData);
        })
        .catch((err) => console.log(err));
    }
  }, [IsLogged]);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      checkToken(token)
        .then((res) => {
          setEmail(res.data.email);
          setIsLogged(true);
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  }, []);

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
      .editUserInfo(data)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .editUserAvatar(avatar)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .handleLikeCard(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    const cardId = card._id;

    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((card) => card._id !== cardId));
      })
      .catch((res) => console.log(res));
  }

  function handleAddPlace(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setCards((cards) => [newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleShowInfoMessage(message) {
    setInfoMessage(message);
  }

  function handleLogin() {
    setIsLogged(true);
  }

  function handleLogout() {
    localStorage.removeItem("token");
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
              IsLogged={IsLogged}
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
