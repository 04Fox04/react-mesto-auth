import React, { useRef } from "react"
import PopupWithForm from "./PopupWithForm"

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, renderLoading }) {
  const avatarRef = useRef(null)

  function handleSubmit(event) {
    event.preventDefault()
    onUpdateAvatar({
      avatar: avatarRef.current.value
    })
  }

  return (
    <PopupWithForm
      title={"Редактировать аватар"}
      name={"avatar"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      renderLoading={renderLoading}
    >
      <input type="url" id="avatar" name="avatar" className="popup__input popup__input_type_link" required placeholder="Ссылка на картинку" ref={avatarRef} />
      <span className="error-text avatar-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup