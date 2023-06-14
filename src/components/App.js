import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react"
import { api } from "../utils/Api"
import Header from "./Header"
import Main from "./Main"
import Footer from "./Footer"
import ImagePopup from "./ImagePopup"
import { CurrentUserContext } from "../contexts/CurrentUserContext"
import EditProfilePopup from "./EditProfilePopup"
import EditAvatarPopup from "./EditAvatarPopup"
import AddPlacePopup from "./AddPlacePopup"
import Login from "../components/Login"
import Register from "../components/Register"
import ProtectedRoute from "../components/ProtectedRoute"
import * as Auth from "../utils/Auth"
import InfoTooltip from "../components/InfoTooltip"
import ConfirmDeleteCardPopup from "./ConfirmDeleteCardPopup.js"

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deletedCard, setDeletedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [renderLoading, setRenderLoading] = useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleEditAvatarClick = () => {
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
  }
  function handleDeleteCardClick(card) {
    setDeletedCard(card);
  }

  useEffect(() => {
    if (loggedIn) {
    api
      .getInitialCards()
      .then((cards) => setCards(cards))
      .catch((err) => console.log(`Ошибка ${err}`))
    }
  }, [loggedIn]);

  function closeAllPopups() {
    const allPopupStates = [
      setIsEditProfilePopupOpen,
      setIsAddPlacePopupOpen,
      setIsEditAvatarPopupOpen,
      setInfoTooltipPopupOpen
    ]
    allPopupStates.forEach((state) => state(false))
    setSelectedCard(null)
    setDeletedCard(null)
  }

  function addCard(data) {
    setRenderLoading(true)
    api
      .getAddCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch((err) => console.log(`Ошибка ${err}`))
      .finally(() => {
        setRenderLoading(false)
      })
  }

  function handleUpdateAvatar(link) {
    setRenderLoading(true)
    api
      .getEditAvatar(link)
      .then((item) => {
        setCurrentUser(item)
        closeAllPopups()
      })
      .catch((err) => console.log(`Ошибка ${err}`))
      .finally(() => {
        setRenderLoading(false)
      })
  }

  function handleUpdateUser(data) {
    setRenderLoading(true)
    api
      .getEditUser(data)
      .then((userInfo) => {
        setCurrentUser(userInfo)
        closeAllPopups()
      })
      .catch((err) => console.log(`Ошибка ${err}`))
      .finally(() => {
        setRenderLoading(false)
      })
  }

  useEffect(() => {
    if (loggedIn) {
      api
        .getInitialUser()
        .then((userInfo) => setCurrentUser(userInfo))
        .catch((err) => console.log(`Ошибка ${err}`))
    }
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id)
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)))
      })
      .catch((err) => console.log(`Ошибка ${err}`))
  }

  function handleCardDelete() {
    setRenderLoading(true)
    console.log(deletedCard._id);
    api
      .deleteCards(deletedCard._id)
      .then(() => {
        setCards(cards.filter((card) => card._id !== deletedCard._id));
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка ${err}`))
      .finally(() => {
        setRenderLoading(false)
      })
  }

  function handleLoginTrueStatus() {
    setLoggedIn(true);
  }

  const handleRegister = (email, password) => {
    setRenderLoading(true)
    Auth
      .register(email, password)
      .then(() => {
        setSuccess(true);
        setInfoTooltipPopupOpen(true);
        navigate('/sign-in');
      })
      .catch((err) => {
        setSuccess(false);
        setInfoTooltipPopupOpen(true);
        console.log(err);
      })
      .finally(() => {
        setRenderLoading(false)
      })
  }

  const handleLogin = (email, password) => {
    setRenderLoading(true)
    Auth
      .authorization(email, password)
      .then((data) => {
        if (data.token) localStorage.setItem("token", data.token);
        handleLoginTrueStatus();
        setUserEmail(email);
        navigate('/');

      })
      .catch((err) => {
        setSuccess(false);
        setInfoTooltipPopupOpen(true);
        console.log(err);
      })
      .finally(() => {
        setRenderLoading(false);
      })
  }

  const tokenCheck = () => {
    const token = localStorage.getItem("token");
    if (token) {
      Auth
        .tokenCheck(token)
        .then((res) => {
          handleLoginTrueStatus();
          setUserEmail(res.data.email);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          navigate('/sign-in')
        })
    }
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  function onSignOut() {
    localStorage.removeItem("token");
    navigate('/sign-in')
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header userEmail={userEmail} onSignOut={onSignOut} />
          <Routes>
            <Route path="/sign-in" element={<Login onLogin={handleLogin} renderLoading={renderLoading ? "Вход..." : "Войти"} />} />
            <Route path="/sign-up" element={<Register onRegister={handleRegister} renderLoading={renderLoading ? "Регистрация..." : "Зарегистрироваться"} />} />
            <Route
              path="/"
              element={<ProtectedRoute
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                handleDeleteCardClick={handleDeleteCardClick}
                cards={cards}
                loggedIn={loggedIn}
                element={Main}
              />}
            />
            <Route path="*" element={<Navigate to={loggedIn ? '/' : '/sign-in'} />} />
          </Routes>
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            renderLoading={renderLoading ? "Сохранение..." : "Сохранить"}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            renderLoading={renderLoading ? "Сохранение..." : "Сохранить"}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={addCard}
            renderLoading={renderLoading ? "Создание..." : "Создать"}
          />
          <ConfirmDeleteCardPopup
            isOpen={deletedCard}
            onClose={closeAllPopups}
            onCardDelete={handleCardDelete}
            renderLoading={renderLoading ? "Удаление..." : "Да"}
          />
          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            success={success}
            tooltipText={success ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App