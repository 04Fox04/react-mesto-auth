import React from 'react';
import PopupWithForm from "./PopupWithForm"

function ConfirmDeleteCardPopup({ isOpen, onClose, onCardDelete, renderLoading }) {
    function handleCardDelete(event) {
        event.preventDefault();
        onCardDelete();
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