export default class Api {
  constructor({ baseUrl, headers }) {
  this._baseUrl = baseUrl;
  this._headers = headers;
  }

  _respond(res) {
      if (res.ok) {
        return res.json();
      } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then((res) => this._respond(res));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then((res) => this._respond(res));
  }

  editUserInfo( name, about ) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
      name,
      about
      })
    })
    .then((res) => this._respond(res));
  }

  addNewCard( name, link ) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
    .then((res) => this._respond(res));
  }

  deleteCard( cardId ) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    })
    .then((res) => this._respond(res));
  }

  setLike( cardId ) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then((res) => this._respond(res));
  }

  deleteLike( cardId ) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => this._respond(res));
  }

  changeAvatar( avatar ) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
    .then((res) => this._respond(res));
    }
}
