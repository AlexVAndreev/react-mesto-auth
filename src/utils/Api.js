
class Api {
  constructor(options) {
      this._url = options.baseUrl;
      this._headers = options.headers;
  }

  getData(token) {
      return Promise.all([this.getUserData(token), this.getInitialCards(token)]);
  }

  getInitialCards(token) {
      return fetch(`${this._url}/cards`, {
          headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
          }
      })
          .then(res => this._checkResult(res));
  }

  getUserInfo(token) {
      return fetch(`${this._url}/users/me`, {
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
          }
      })
          .then(res => this._checkResult(res));
  }

  editProfile(data, token) {
      return fetch(`${this._url}/users/me`, {
          method: 'PATCH',
          headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              name: data.name,
              about: data.about,
              avatar: data.avatar,
          })
      })
          .then(res => this._checkResult(res));
  }

  addCard(card, token) {
      return fetch(`${this._url}/cards`, {
          method: 'POST',
          headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              name: card.name,
              link: card.link,
          })
      })
          .then(res => this._checkResult(res))
  }

  setLike(cardId, token) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
          method: 'PUT',
          headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
      })
          .then(res => this._checkResult(res));
  }

  deleteLike(cardId, token) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
          method: 'DELETE',
          headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
      })
          .then(res => this._checkResult(res));
  }

  deleteCard(cardId, token) {
      return fetch(`${this._url}/cards/${cardId}`, {
          method: 'DELETE',
          headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
      })
          .then(res => this._checkResult(res));
  }

  changeAvatar(avatarUrl, token) {
      return fetch(`${this._url}/users/me/avatar`, {
          method: 'PATCH',
          headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              avatar: avatarUrl.avatar,
          })
      })
          .then(res => this._checkResult(res));
  }

  _checkResult(res) {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`????????????: ${res.status}`);
  }
}

const api = new Api({
  baseUrl: 'https://awaback.nomoredomains.icu',
  headers: {
       Authorization: `${window.localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
  }
});

export { api }
