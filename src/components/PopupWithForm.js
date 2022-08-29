import React from "react";

function PopupWithForm(props) {
  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        props.onClose();
      }
    }
    if (props.isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [props.isOpen]);

  return (
    <section
      className={`popup popup_${props.name} ${props.isOpen && "popup_opened"}`}
    >
      <div className="popup__container">
        <button
          className={`popup__close-icon`}
          name="popup-close-icon"
          type="button"
          onClick={props.onClose}
        ></button>
        <form
          className="popup__form"
          name={`${props.name}__form`}
          onSubmit={props.onSubmit}
        >
          <h2 className="popup__title">{props.title}</h2>

          <div className="popup__input">{props.children}</div>

          <button
            type="submit"
            className="popup__submit-btn"
            value="Сохранить"
            name="element-submit"
          >
            Сохранить
          </button>
        </form>
      </div>
    </section>
  );
}
export default PopupWithForm;
