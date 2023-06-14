import React from "react";

function PopupWithForm({ title, name, isOpen, onClose, renderLoading, onSubmit, ...props }) {
  return (
    <div className={`popup popup_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container popup__container_profile-edit">
        <button className="popup__close" type="button" aria-label="Закрыть" onClick={onClose}></button>
        <form className="popup__form" name={`form-${name}`} method="get" onSubmit={onSubmit}>
          <h2 className="popup__title">{title}</h2>
          {props.children}
          <button className="popup__save" type="submit">{renderLoading}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm
