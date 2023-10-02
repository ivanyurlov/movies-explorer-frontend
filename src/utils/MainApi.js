class MainApi {
  constructor ({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => this._getResponseData(res));
  }

  editUserInfo(name, email, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        "name": name,
        "email": email
      })
    })
    .then(res => this._getResponseData(res)); 
  }

  getSavedMovies(token) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => this._getResponseData(res));
  }

  addMovie(movie, token) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: (`https://api.nomoreparties.co${movie.image.url}`),
        trailerLink: movie.trailerLink,
        thumbnail: (`https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`),
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN
      })
    })
    .then(res => this._getResponseData(res));
  }

  deleteMovie(movieId, token) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => this._getResponseData(res));
  }
};

const mainApi = new MainApi({
  baseUrl: 'https://api.ivanyurlov.nomoredomainsicu.ru',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default mainApi;