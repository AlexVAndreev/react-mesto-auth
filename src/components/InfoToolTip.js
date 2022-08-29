import React from "react";

function InfoTooltip({ isOpen, onClose, infoPopupStatus }) {
  console.log(isOpen);
  console.log(onClose);
  console.log(infoPopupStatus);
  return (
    <section className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <form action="#" className="popup__container">
        <button
          type="button"
          aria-label="close"
          className="popup__close-icon"
          onClick={onClose}
        ></button>
        <img src={infoPopupStatus.src} alt="" className="popup__image-result" />
        <h2 className="popup__title">{infoPopupStatus.message}</h2>
      </form>
    </section>
  );
}

export default InfoTooltip;
