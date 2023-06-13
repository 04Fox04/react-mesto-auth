import React from 'react';
import PopupWithForm from "./PopupWithForm"

function ConfirmDeleteCardPopup({ isOpen, onClose, onCardDelete, renderLoading, card}) {
    function handleCardDelete(event) {
        event.preventDefault();
        onCardDelete(card);
    }

    return (
        <PopupWithForm
        title={"Вы уверены?"}
        name={"delete"}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleCardDelete}
        renderLoading={renderLoading}
      ></PopupWithForm>
    )
}

export default ConfirmDeleteCardPopup;