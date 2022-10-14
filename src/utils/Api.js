// "use strict";

import { address } from "../utils/constants.js";

class Api {
  constructor(link) {
    this._Url = link;
    this._token = "";
    this._headers = {
      "Content-Type": "application/json",
    };}

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
  setHeadersAuth(token) {
    this._headers = { ...this._headers, Authorization: `Bearer ${token}` };
  }
}

const api = new Api('https://awaback.nomoredomains.icu/');

export default api;
