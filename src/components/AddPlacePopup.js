import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleCardName(evt) {
    setName(evt.target.value);
  }

  function handleCardLink(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
      name: name,
      link: link,
    });
  }

  useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="element-add"
      title="Добавление нового места"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="element-input-title"
        className="popup__element-input popup__element-input_type_title popup__input"
        value={name}
        placeholder="Название"
        name="name"
        minLength="2"
        maxLength="30"
        onChange={handleCardName}
        required
      />
      <span className="element-input-title-error popup__span"></span>
      <input
        type="url"
        id="element-input-link"
        className="popup__element-input popup__element-input_type_link popup__input"
        value={link}
        placeholder="Ссылка на картинку"
        name="link"
        onChange={handleCardLink}
        required
      />
      <span className="element-input-link-error popup__span"></span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
