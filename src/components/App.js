import React from "react";
import {api} from "../utils/Api";
import Header from "./Header";
import Main from "./Main.js";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import {CurrentUserContext} from "../context/CurrentUserContext";
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
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = React.useState(false);
  const [infoPopupStatus, setInfoPopupStatus] = React.useState({
    src: "",
    message: "",
  });
  const history = useHistory();

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
        auth.getContent(jwt)
            .then((res) => {
                if (res) {
                    setIsLoggedIn(true);
                    setEmailValue(res.email);
                    history.push('/');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
}, []);

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (isLoggedIn) {
      api.getUserInfo(jwt)
      .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (isLoggedIn) {
      api
        .getInitialCards(jwt)
        .then((cards) => {
          setCards(cards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

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
    setIsInfoPopupOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleUpdateUser(data) {
    const jwt = localStorage.getItem("jwt");
    api
      .editProfile(data,jwt)
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
    const jwt = localStorage.getItem("jwt");
    api
      .changeAvatar(data,jwt)
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
    if (isLoggedIn) {
        const jwt = localStorage.getItem('jwt');

        const isLiked = card.likes.some(i => i._id === currentUser._id);
        const changeLike = isLiked ? api.deleteLike(card._id, jwt) : api.setLike(card._id, jwt);

        changeLike.then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
            .catch((err) => console.log(err));
    }
}


function handleCardDelete(card) {
  if (isLoggedIn) {
      const jwt = localStorage.getItem('jwt');
      api.deleteCard(card._id, jwt).then((card) => {
              const newCard = cards.filter((c) => c._id !== card._id);
              setCards(newCard);
          })
          .catch((err) => {
              console.log(err);
          });
  }
}
  function handleAddCard(card) {
    const jwt = localStorage.getItem('jwt');
    api
      .addCard(card,jwt)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleInfoPopupOpen() {
    setIsInfoPopupOpen(true);
  }

  function authorization(email, password) {
    auth.authorize(email, password)
        .then((token) => {
                const jwt = token;
                jwt && localStorage.setItem('jwt', jwt);

                console.log(jwt, 'jwt');
                setEmailValue(email);
                setIsLoggedIn(true);
                history.push('/');
        })
        .catch((err) => {
            console.log(err);
        });
}

  function signOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    history.push("/sign-in");
  }

  function register(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setInfoPopupStatus({
          src: ok,
          message: "Вы успешно зарегистрировались!",
        });
        setTimeout(history.push, 3000, "/sign-in");
      })
      .catch(() => {
        setInfoPopupStatus({
          src: bad,
          message: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        setTimeout(history.push, 3000, "/sign-up");
      })
      .finally(() => {
        handleInfoPopupOpen();
        setTimeout(closeAllPopups, 4000);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <section className="page">
        <Header email={emailValue} signOut={signOut} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
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
            <Login authorize={authorization} popup={handleInfoPopupOpen} />
          </Route>
          <Route path="/sign-up">
            <Register register={register} />
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
