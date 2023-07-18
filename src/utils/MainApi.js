export const BASE_URL = 'https://api.cherrymovies.nomoreparties.sbs';
export const MOVIESAPI_URL = 'https://api.nomoreparties.co';

function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}

export const register = (regEmail, regPassword, regName) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: regName,
      password: regPassword,
      email: regEmail
    })
  })
    .then(handleResponse)
};

export const authorize = (authEmail, authPassword) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: authPassword,
      email: authEmail
    })
  })
    .then(handleResponse)
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        return data;
      }
    })
};

export const changeUserInfo = (newName, newEmail) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({
      name: newName,
      email: newEmail
    })
  })
    .then(handleResponse);
}

export const getUser = () => {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${localStorage.getItem('jwt')}`,
    },
  })
    .then(handleResponse);
}

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`,
    }
  })
    .then(handleResponse)
}

export const getSavedMovies = () => {
  return fetch(`${BASE_URL}/movies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  })
    .then(handleResponse)
};

export const saveMovie = (card) => {
    return fetch(`${BASE_URL}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        country: card.country,
        director: card.director,
        duration: card.duration,
        year: card.year,
        description: card.description,
        image: `${MOVIESAPI_URL}${card.image.url}`,
        trailerLink: card.trailerLink,
        thumbnail: `${MOVIESAPI_URL}${card.image.formats.thumbnail.url}`,
        movieId: card.id,
        nameRU: card.nameRU,
        nameEN: card.nameEN,
      }),
    })
      .then(handleResponse);
  }

  export const deleteMovie = (card) => {
    return fetch(`${BASE_URL}/movies/${card._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
      .then(handleResponse);
}
