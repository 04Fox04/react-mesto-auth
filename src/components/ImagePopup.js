import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    card && (
      <div className={`popup popup-window ${card ? "popup_opened" : ""}`}>
        <div className="popup__window-container">
          <button className="popup__close popup__window-close" type="button" aria-label="Закрыть" onClick={onClose}></button>
          <img className="popup__window-image" src={card.link} alt={card.name} />
          <p className="popup__zoom-title">{card.name}</p>
        </div>
      </div>
    )
  )
};

export default ImagePopup
