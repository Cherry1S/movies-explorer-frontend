import { MOVIESAPI_URL } from "./constants";

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
  baseUrl: `${MOVIESAPI_URL}/beatfilm-movies`,
});

export default api


