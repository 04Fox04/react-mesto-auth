import React, { useContext } from "react"
import Card from "./Card"
import { CurrentUserContext } from "../contexts/CurrentUserContext"

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, handleDeleteCardClick, cards }) {
  const currentUser = useContext(CurrentUserContext)
  return (
    <div>
      <section className="profile">
        <div className="profile__avatar-area">
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
          <button className="profile__avatar-edit" aria-label="Редактировать аватар профиля" onClick={onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__info-name">{currentUser.name}</h1>
          <button className="profile__info-button" type="button" aria-label="Редактировать профиль" onClick={onEditProfile}></button>
          <p className="profile__info-job">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" aria-label="Добавить фото" onClick={onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <li key={card._id}>
              <Card card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} handleDeleteCardClick={handleDeleteCardClick} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Main
