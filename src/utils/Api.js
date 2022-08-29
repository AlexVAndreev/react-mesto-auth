class Api {
  constructor(connectConfig) {
    this._Url = connectConfig.Url;
    this._headers = connectConfig.headers;
  }

  _sendRequest(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._Url}cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._sendRequest(res));
  }

  getUserInfo() {
    return fetch(`${this._Url}users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._sendRequest(res));
  }

  changeUserInfo(data) {
    return fetch(`${this._Url}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._sendRequest(res));
  }

  addCard(data) {
    return fetch(`${this._Url}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._sendRequest(res));
  }

  addLike(id) {
    return fetch(`${this._Url}cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._sendRequest(res));
  }

  deleteCard(idCard) {
    return fetch(`${this._Url}cards/${idCard}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._sendRequest(res));
  }
  deleteLike(id) {
    return fetch(`${this._Url}cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._sendRequest(res));
  }

  changeAvatar(link) {
    console.log(link);
    return fetch(`${this._Url}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link.avatar,
      }),
    }).then((res) => this._sendRequest(res));
  }
  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.likeCard(cardId);
    } else {
      return this.dislikeCard(cardId);
    }
  }
  likeCard(id) {
    return fetch(`${this._Url}cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._sendRequest(res));
  }

  dislikeCard(id) {
    return fetch(`${this._Url}cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._sendRequest(res));
  }
}

const api = new Api({
  Url: "https://auth.nomoreparties.co/",
  headers: {
    authorization: `Bearer ${localStorage.getItem("jwt")}`,
    "Content-Type": "application/json",
  },
});

export default api;
