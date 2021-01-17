import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import * as api from '../../services/movie-api';
import PageHeading from '../../components/PageHeading/PageHeading';
import s from './HomeView.module.css';

export default function HomeView() {
  const location = useLocation();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    api.fetchMoviesTrending().then(({ results }) => setMovies(results));
  }, []);

  return (
    <>
      <PageHeading text="Tranding today" />

      {movies && (
        <ul className={s.container}>
          {movies.map(
            ({ id, name, title, poster_path, original_name }, index) => (
              <div className={s.item} key={index}>
                <li>
                  <NavLink
                    className={s.link}
                    to={{
                      pathname: `/movies/${id}`,
                      state: { from: { location } },
                    }}
                  >
                    {' '}
                    <img
                      src={api.POSTER_URL + poster_path}
                      alt={original_name}
                      width="250"
                    />
                    <h4>{name ? name : title}</h4>
                  </NavLink>
                </li>
              </div>
            ),
          )}
        </ul>
      )}
    </>
  );
}
