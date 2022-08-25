import React from "react";

function InfoTooltip(props) {
  return (
    <section className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
      <form action="#" className="popup__container">
        <button
          type="button"
          aria-label="close"
          className="popup__close-icon"
          onClick={props.onClose}
        ></button>
        <img src={props.image} alt="" className="popup__image-result" />
        <h2 className="popup__title">{props.title}</h2>
      </form>
    </section>
  );
}

export default InfoTooltip;
