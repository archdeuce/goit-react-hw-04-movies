import {
  useParams,
  useLocation,
  NavLink,
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as api from '../../services/movie-api';
import CastView from '../CastView/CastView';
import ReviewsView from '../ReviewsView/ReviewsView';
import PageHeading from '../../components/PageHeading/PageHeading';
import NotFoundViews from '../NotFoundView';
import s from './MovieDetailsView.module.css';

export default function MovieDetailsView() {
  const { url, path } = useRouteMatch();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    api.fetchMovieDetails(movieId).then(setMovie).catch(setError);
  }, [movieId]);

  const handleScroll = e => {
    setTimeout(() => {
      e.target.scrollIntoView({ alignToTop: true, behavior: 'smooth' });
    }, 300);
  };

  return (
    <>
      <PageHeading text="Movie details" />

      <NavLink to={location?.state?.from?.location ?? '/movies'}>
        &#8592; Go back
      </NavLink>

      {error && <NotFoundViews />}

      {movie && (
        <>
          <div className={s.movieContainer}>
            <img
              src={api.POSTER_URL + movie.poster_path}
              alt={movie.original_name}
              width="400"
            />
            <div className={s.movieDetails}>
              <h2>{movie.name}</h2>
              <h2>User Score:</h2>
              <p> {movie.vote_average * 10}%</p>
              <h2>Overview: </h2>
              <p>{movie.overview}</p>
              <h2>Genres:</h2>
              <ul className={s.genresList}>
                {movie.genres.map(({ name }, index) => (
                  <li key={index}>
                    <span className={s.genre}>{name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={s.additionContainer}>
            <h2>Addition information</h2>
            <ul>
              <li>
                <NavLink
                  to={`${url}/cast`}
                  className={s.link}
                  onClick={handleScroll}
                >
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`${url}/reviews`}
                  className={s.link}
                  onClick={handleScroll}
                >
                  Reviews
                </NavLink>
              </li>
            </ul>

            <Switch>
              <Route path={`${path}/cast`}>
                <CastView movieId={movieId} />
              </Route>

              <Route path={`${url}/reviews`}>
                <ReviewsView movieId={movieId} />
              </Route>
            </Switch>
          </div>
        </>
      )}
    </>
  );
}
