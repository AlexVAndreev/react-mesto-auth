import React from "react";
import Card from "./Card";
import "../index.css";
import CurrentUserContext from "../context/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  console.log(currentUser);
  return (
    <main className="main-container">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            className="profile__avatar"
            alt="Аватарка профиля"
            src={currentUser.data.avatar}
            onClick={props.onEditAvatar}
          />
        </div>
        <div className="profile__profile-info">
          <h1 className="profile__title">{currentUser.data.name}</h1>
          <button
            className="profile__edit-button"
            name="profile-edit-button"
            type="button"
            onClick={props.onEditProfile}
          ></button>
          <p className="profile__subtitle">{currentUser.data.about}</p>
        </div>
        <button
          className="profile__add-button"
          name="profile-add-button"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <ul className="elements">
        {props.cards.map((card) => {
          return (
            <Card
              card={card}
              onCardClick={props.onCardClick}
              key={card._id}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          );
        })}
      </ul>
    </main>
  );
}
export default Main;
