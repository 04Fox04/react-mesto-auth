import React, { useContext } from "react"
import { CurrentUserContext } from "../contexts/CurrentUserContext"

function Card({ card, onCardClick, onCardLike, handleDeleteCardClick }) {
  const currentUser = useContext(CurrentUserContext)
  const isOwn = card.owner._id === currentUser._id
  const isLiked = card.likes.some((i) => i._id === currentUser._id)
  const cardLikeButtonClassName = `elements__like ${isLiked && "elements__like-active"}`

  function handleClick() {
    onCardClick(card)
  }
  function handleLikeClick() {
    onCardLike(card)
  }
  function handleDeleteClick() {
    handleDeleteCardClick(card)
  }

  return (
    <div className="elements__item">
      {isOwn && (<button className="elements__delete" type="button" aria-label="Удалить" onClick={handleDeleteClick}></button>)}
      <img className="elements__image" src={card.link} alt={card.name} onClick={() => handleClick(card)} />
      <div className="elements__container">
        <h3 className="elements__title">{card.name}</h3>
        <div>
          <button className={cardLikeButtonClassName} type="button" aria-label="Нравится" onClick={() => handleLikeClick(card)}></button>
          <div className="elements__number-like">{card.likes.length}</div>
        </div>
      </div>
    </div>
  )
}

export default Card