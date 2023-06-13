class Api {
  constructor({ url, headers }) {
    this._url = url
    this._headers = headers
  }

  getInitialCards() {
    return fetch(this._url + "/cards", {
      method: "GET",
      headers: this._headers
    }).then((res) => this._response(res))
  }
  _response(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }
  getInitialUser() {
    return fetch(this._url + "/users/me", {
      method: "GET",
      headers: this._headers
    }).then((res) => this._response(res))
  }
  getEditUser(data) {
    return fetch(this._url + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }).then((res) => this._response(res))
  }
  getEditAvatar(link) {
    return fetch(this._url + "/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link.avatar
      })
    }).then((res) => this._response(res))
  }
  getAddCard(data) {
    return fetch(this._url + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then((res) => this._response(res))
  }
  deleteCards(cardId) {
    return fetch(this._url + "/cards/" + cardId, {
      method: "DELETE",
      headers: this._headers
    }).then((res) => this._response(res))
  }
  deleteLike(cardId) {
    return fetch(this._url + "/cards/" + cardId + "/likes", {
      method: "DELETE",
      headers: this._headers
    }).then((res) => this._response(res))
  }
  addLike(cardId) {
    return fetch(this._url + "/cards/" + cardId + "/likes", {
      method: "PUT",
      headers: this._headers
    }).then((res) => this._response(res))
  }
  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.addLike(cardId)
    } else {
      return this.deleteLike(cardId)
    }
  }
}

export const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-64",
  headers: {
    authorization: "370c2e24-51f6-42f1-a96f-2c7119c66fcc",
    "content-type": "application/json",
  },
});