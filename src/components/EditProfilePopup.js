import PopupWithForm from "./PopupWithForm";
import React from "react";
import CurrentUserContext from "../context/CurrentUserContext";

function EditProfilePoppup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };

  const handleDescriptionChange = (evt) => {
    setDescription(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  };
  return (
    <PopupWithForm
      name="profile-edit"
      title="Редактирование профиля"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="profile-input-title"
        className="popup__profile-input popup__profile-input_type_title popup__input"
        placeholder="Имя"
        value={name || ""}
        name="name"
        minLength="2"
        maxLength="40"
        onChange={handleNameChange}
        required
      />
      <span className="profile-input-title-error popup__span"></span>
      <input
        type="text"
        id="profile-input-subtitle"
        placeholder="Описание"
        className="popup__profile-input popup__profile-input_type_subtitle popup__input"
        value={description || ""}
        name="about"
        minLength="2"
        maxLength="200"
        onChange={handleDescriptionChange}
        required
      />
      <span className="profile-input-subtitle-error popup__span"></span>
    </PopupWithForm>
  );
}
export default EditProfilePoppup;
