import { useState, useEffect } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import * as api from '../../services/movie-api';
import PageHeading from '../../components/PageHeading/PageHeading';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import ReactLoader from 'react-loader-spinner';
import { toast } from 'react-toastify';
import s from './MoviesView.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function MoviesView() {
  const history = useHistory();
  const location = useLocation();
  const [query, setQuery] = useState(
    new URLSearchParams(location.search).get('query') ?? '',
  );
  const [placeholder, setPlaceholder] = useState('Search movie');
  const [status, setStatus] = useState(Status.IDLE);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (query === '') {
      return;
    }

    searchMovie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchMovie = () => {
    setMovies([]);
    setStatus(Status.PENDING);

    api
      .fetchMovieByName(query)
      .then(({ results }) => {
        if (results.length === 0) {
          toast.info('Nothing found.', { toastId: 'error' });
          setStatus(Status.RESOLVED);
          return;
        }

        setMovies(results);
      })
      .catch(error => {
        setStatus(Status.REJECTED);
        toast.error(error.message, { toastId: 'error' });
      })
      .finally(() => {
        setStatus(Status.IDLE);
      });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (query === '') {
      toast.info('Empty input field.', { toastId: 'error' });
      return;
    }

    history.push({ ...location, search: `query=${query}` });

    searchMovie();
    setPlaceholder(query);
    setQuery('');
  };

  const handleChange = e => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  return (
    <>
      <PageHeading text="Search films" />

      <div className={s.searchBar}>
        <form onSubmit={handleSubmit} className={s.searchForm}>
          <input
            className={s.searchFormInput}
            type="text"
            placeholder={placeholder}
            autoComplete="off"
            value={query}
            onChange={handleChange}
          ></input>
          <button type="submit" className={s.searchFormButton}>
            <span className={s.searchFormButtonLabel}>Search</span>
          </button>
        </form>
      </div>

      {status === Status.PENDING && (
        <ReactLoader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          className={s.spinner}
        />
      )}

      {movies && (
        <ul className={s.movieList}>
          {movies.map(({ id, name, title }, index) => (
            <li key={index}>
              <NavLink
                className={s.link}
                to={{
                  pathname: `/movies/${id}`,
                  state: { from: { location } },
                }}
              >
                {name ? name : title}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
