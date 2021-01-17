const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '16e864431700878c491f8d79cb01799e';
const LANG = 'en-US';

export const POSTER_URL = 'https://image.tmdb.org/t/p/w500';

// API Docs https://developers.themoviedb.org/3/getting-started/introduction
async function fetchWithErrorHandling(url = '', config = {}) {
  const response = await fetch(url, config);

  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

// https://developers.themoviedb.org/3/trending/get-trending
export function fetchMoviesTrending() {
  return fetchWithErrorHandling(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`,
  );
}

// https://developers.themoviedb.org/3/search/search-movies
export function fetchMovieByName(name, page = 1, adult = false) {
  return fetchWithErrorHandling(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${name}&language=${LANG}&page=${page}&include_adult=${adult}`,
  );
}

// https://developers.themoviedb.org/3/movies/get-movie-details
export function fetchMovieDetails(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=${LANG}`,
  );
}

// https://developers.themoviedb.org/3/movies/get-movie-credits
export function fetchMovieCredits(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=${LANG}`,
  );
}

// https://developers.themoviedb.org/3/movies/get-movie-reviews
export function fetchMovieReviews(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}&language=${LANG}&page=1`,
  );
}
