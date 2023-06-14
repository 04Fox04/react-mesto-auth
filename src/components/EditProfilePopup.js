import React, { useState, useEffect, useContext } from "react"
import PopupWithForm from "./PopupWithForm"
import { CurrentUserContext } from "../contexts/CurrentUserContext"

function EditProfilePopup({ isOpen, onClose, renderLoading, ...props }) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const currentUser = useContext(CurrentUserContext)

  useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [currentUser, isOpen])

  function handleSubmit(event) {
    event.preventDefault()
    props.onUpdateUser({
      name,
      about: description
    })
  }

  return (
    <PopupWithForm
      title={"Редактировать профиль"}
      name={"profile"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      renderLoading={renderLoading}
    >
      <input type="text" id="name" name="name" className="popup__input popup__input_type_name" minLength={2} maxLength={40} value={name || ""} placeholder="Имя" required onChange={(e) => setName(e.target.value)} />
      <span className="error-text name-error"></span>
      <input type="text" id="description" name="about" className="popup__input popup__input_type_job" minLength={2} maxLength={200} value={description || ""} placeholder="Описание" required onChange={(e) => setDescription(e.target.value)} />
      <span className="error-text description-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup