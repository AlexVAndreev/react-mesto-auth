import React from "react";

function ImagePopup({ card, isOpen, onClose }) {
  return (
    <section
      className={`popup popup_image popup_cards  ${
        isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__card-container">
        <button
          className="popup__close-icon popup__card-close-button"
          name="popup-card-close-icon"
          type="button"
          onClick={onClose}
        ></button>
        <img src={card.link} alt={card.name} className="popup__card-image" />
        <h3 className="popup__card-title">{card.name}</h3>
      </div>
    </section>
  );
}
export default ImagePopup;
