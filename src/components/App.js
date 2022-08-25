import React from "react";
import Header from "./Header";
import Main from "./Main.js";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import CurrentUserContext from "../context/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import Register from "./Register.js";
import Login from "./Login.js";
import InfoTooltip from "./InfoToolTip";
import ProtectedRoute from "./ProtectedRoute";
import ok from "../images/ok.svg";
import bad from "../images/bad.svg";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});

  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
    _id: "",
  });
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isImagePopupOpen;
  // --------------------------------//
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const [successPopupOpen, setSuccessPopupOpen] = React.useState(false);
  const [failPopupOpen, setFailPopupOpen] = React.useState(false);

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  React.useEffect(() => {
    api.getUserInfo().then(setCurrentUser).catch(console.error);
  }, []);

  React.useEffect(() => {
    Promise.all([api.getInitialCards()])
      .then(([cardsData]) => {
        // console.log(cardsData);
        setCards(cardsData.data);
      })
      .catch((err) => {
        console.log(`Не удалось получить данные с сервера. ${err}`);
      })
      .finally(() => {});
  }, []);

  function handleEditProfilePopupOpen() {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlacePopupOpen() {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleEditAvatarPopupOpen() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setFailPopupOpen(false);
    setSuccessPopupOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleUpdateUser(data) {
    api
      .changeUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .then(() => {
        setEditProfilePopupOpen(false);
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  }
  function handleUpdateAvatar(data) {
    api
      .changeAvatar(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .then(() => {
        setEditAvatarPopupOpen(false);
      })
      .catch((err) => {
        console.log(`Ошибка:${err}`);
      });
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка:${err}`);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((item) => item !== card));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
  function handleAddCard(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => {
        setAddPlacePopupOpen(false);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
  const history = useHistory();

  React.useEffect(() => {
    tokenCheck();
    console.log("-------------");
    console.log(loggedIn);
    console.log("-------------");
  }, []);

  const tokenCheck = () => {
    let jwt = localStorage.getItem("jwt");
    console.log(`My: ${jwt}`);
    if (jwt) {
      api.getUserInfo().then((res) => {
        console.log(res);
        if (res) {
          setLoggedIn(true);
          history.push("/");
        } else {
          localStorage.removeItem("jwt");
        }
      });
    }
  };

  function notify() {
    setSuccess(true);
  }

  function onAuth() {
    setLoggedIn(true);
  }
  function handleRegisterPopupOpen() {
    success
      ? setFailPopupOpen(!failPopupOpen)
      : setSuccessPopupOpen(!successPopupOpen);
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <section className="page">
        <Header />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={true}
            component={Main}
            onEditAvatar={handleEditAvatarPopupOpen}
            onEditProfile={handleEditProfilePopupOpen}
            onAddPlace={handleAddPlacePopupOpen}
            cards={cards}
            onCardLike={handleCardLike}
            onCardClick={handleCardClick}
            onCardDelete={handleCardDelete}
          />
          <Route path="/sign-in">
            <Login onAuth={onAuth} tokenCheck={tokenCheck} />
          </Route>
          <Route path="/sign-up">
            <Register notify={notify} popup={handleRegisterPopupOpen} />
          </Route>
          <Route path="/">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <Footer />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          onClose={closeAllPopups}
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddCard}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          title="Вы успешно зарегистрировались!"
          image={ok}
          isOpen={successPopupOpen}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          title="Что-то пошло не так! Попробуйте ещё раз."
          image={bad}
          isOpen={failPopupOpen}
          onClose={closeAllPopups}
        />
      </section>
    </CurrentUserContext.Provider>
  );
}

export default App;
