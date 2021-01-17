import { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
import * as api from '../../services/movie-api';
import s from './ReviewsView.module.css';

export default function Cast({ movieId }) {
  // const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!movieId) return;

    api
      .fetchMovieReviews(movieId)
      .then(({ results }) => setReviews(results))
      .catch(console.log);
  }, [movieId]);

  return (
    <>
      {!!reviews.length && (
        <ul>
          {reviews.map(({ id, author, content }) => (
            <li key={id}>
              <h3>{author}</h3>
              <p className={s.review}>{content}</p>
            </li>
          ))}
        </ul>
      )}

      {!reviews.length && <h4>No additional information.</h4>}
    </>
  );
}
