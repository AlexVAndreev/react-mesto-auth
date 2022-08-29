import React from "react";
import api from "../utils/Api";
import Header from "./Header";
import Main from "./Main.js";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
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
import * as auth from "../utils/auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [emailValue, setEmailValue] = React.useState("");
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
    _id: "",
  });
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);

  const isAnyPopupOpened =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isImagePopupOpen;
  // --------------------------------//
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] =
    React.useState(false);
  const [infoPopupStatus, setInfoPopupStatus] = React.useState({ src: '', message: '' })

  const history = useHistory();
  React.useEffect(() => {
    api.getUserInfo()
        .then((data) => {
            setCurrentUser(data);
        })
        .catch((err) => console.log(err))
        .finally(console.log(currentUser));
}, [isLoggedIn,history])

React.useEffect(() => {
    api.getInitialCards()
        .then((cards) => {
            setCards(cards);
        })
        .catch((err) => {
            console.log(err);
        }).finally(console.log(cards))

}, [])

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isAnyPopupOpened) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isAnyPopupOpened]);

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setEmailValue(res.data.email);
          }
          setIsLoggedIn(true);
          history.push("/");
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn, history]);

  function handleEditProfilePopupOpen() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlacePopupOpen() {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleEditAvatarPopupOpen() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoPopupOpen(false)
 
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
        setIsEditProfilePopupOpen(false);
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
  function handleAddCard(card) {
    api
      .addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .then(() => {
        setAddPlacePopupOpen(false);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }



function handleInfoPopupOpen() {
        setIsInfoPopupOpen(true);
}

  function authorization(email, password) {
    auth.authorize(email, password);
    if (email !== emailValue) {
      setEmailValue(email);
    }
    setIsLoggedIn(true);
    history.push("/");
  }
  function signOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    history.push("/sign-in");
  }


  function registration(email, password) {
    auth.register(email, password)
        .then(() => {
            setInfoPopupStatus({
                src: ok,
                message: 'Вы успешно зарегистрировались!',
            })
            setTimeout(history.push, 3000, "/sign-in");
        })
        .catch(() => {
            setInfoPopupStatus({
                src: bad,
                message: 'Что-то пошло не так! Попробуйте ещё раз.',
            })
            setTimeout(history.push, 3000, "/sign-up")
            console.log('no');
        })
        .finally(() => {
            handleInfoPopupOpen();
            setTimeout(closeAllPopups, 4000);
        })
}

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <section className="page">
        <Header email={emailValue} signOut={signOut} />
        <Switch>
          <ProtectedRoute
            exact path="/"
            isLoggedIn={isLoggedIn}
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
            <Login authorization={authorization} popup={handleInfoPopupOpen} />
          </Route>
          <Route path="/sign-up">
            <Register registration={registration}/>
          </Route>
          <Route path="/">
            {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
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
          isOpen={isInfoPopupOpen}
          onClose={closeAllPopups}
          infoPopupStatus={infoPopupStatus}
        />
      </section>
    </CurrentUserContext.Provider>
  );
}

export default App;
