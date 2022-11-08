import { apiSettings } from "./utils.js";

class MoviesApi {
  constructor(options) {
    this._moviesUrl = options.moviesUrl;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getMovies(token) {
    return fetch(`${this._moviesUrl}/beatfilm-movies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(this._checkResponse);
  }

}

const moviesApi = new MoviesApi(apiSettings);
export default moviesApi;