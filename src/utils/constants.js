//длительность видео в минутах для фильтрации карточек при установленном флажке "Короткометражки"
export const MOVIES_SHORTS_DURATION = 40;

//отображаемое количество карточек и разрешение, при котором оно меняется
export const MOVIES_CARDS = {
  DEFAULT_COUNT: 16,
  DEFAULT_COUNTER: 4,
  WIDTH1: 1000,
  WIDTH1_COUNT: 8,
  WIDTH1_COUNTER: 2,
  WIDTH2: 630,
  WIDTH2_COUNT: 5,
  WIDTH2_COUNTER: 2,
}

//обрабатываемые ошибки
export const ERRORS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
}

//API
export const BASE_URL = 'https://api.cherrymovies.nomoreparties.sbs';
export const MOVIESAPI_URL = 'https://api.nomoreparties.co';
