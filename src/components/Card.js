import React from "react";
import CurrentUserContext from "../context/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwner = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardDeleteButtonClassName = `element__basket ${
    isOwner ? "" : "element__basket_disabled"
  }`;

  const cardLikeButtonClassName = `element__like ${
    isLiked ? "element__like_active" : ""
  }`;

  function handleClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="element">
      <img
        src={card.link}
        alt={card.name}
        className="element__photo"
        onClick={handleClick}
      />
      <button
        className={cardDeleteButtonClassName}
        name="element-delete-button"
        type="button"
        onClick={handleDeleteClick}
      ></button>
      <h2 className="element__title">{card.name}</h2>
      <div className="element__like-container">
        <button
          className={cardLikeButtonClassName}
          name="element-like-button"
          type="button"
          onClick={handleLikeClick}
        ></button>
        <span className="element__like_total">{card.likes.length}</span>
      </div>
    </li>
  );
}
export default Card;
