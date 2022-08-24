import React, { useContext, useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../context/CurrentUserContext";

function EditAvatarPopup(props) {
  const currentUser = useContext(CurrentUserContext);

  const avatarRef = useRef("");

  useEffect(() => {
    avatarRef.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar-change"
      title="Изменение аватара"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        required
        className="popup__element-input popup__input"
        name="avatar"
        placeholder="Ссылка на картинку"
        type="url"
        ref={avatarRef}
      />
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
