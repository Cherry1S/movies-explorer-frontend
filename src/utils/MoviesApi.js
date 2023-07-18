class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _handleResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(this._handleResponse);
  }
}

const api = new Api({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
});

export default api


