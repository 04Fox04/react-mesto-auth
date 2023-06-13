import React, { useRef } from "react"
import PopupWithForm from "./PopupWithForm"

function AddPlacePopup({ isOpen, onClose, onAddPlace, renderLoading }) {
  const cardNameRef = useRef(null)
  const cardLinkRef = useRef(null)

  function handleSubmit(event) {
    event.preventDefault()
    onAddPlace({
      name: cardNameRef.current.value,
      link: cardLinkRef.current.value
    })
  }

  return (
    <PopupWithForm
      title={"Новое место"}
      name={"mesto"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      renderLoading={renderLoading}
    >
      <input type="text" id="title" name="name" className="popup__input popup__input_type_title" minLength={2} maxLength={30} placeholder="Название" defaultValue="" required ref={cardNameRef} />
      <span className="error-text title-error"></span>
      <input type="url" id="url" name="link" className="popup__input popup__input_type_link" placeholder="Ссылка на картинку" defaultValue="" required ref={cardLinkRef} />
      <span className="error-text url-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup