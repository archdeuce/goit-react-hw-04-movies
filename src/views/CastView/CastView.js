import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as api from '../../services/movie-api';
import unknownImage from '../../images/unknown.png';
import s from './CastView.module.css';

export default function Cast() {
  const { movieId } = useParams();
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    if (!movieId) return;

    api
      .fetchMovieCredits(movieId)
      .then(({ cast }) => setCasts(cast))
      .catch(console.log);
  }, [movieId]);

  return (
    <>
      {!!casts.length && (
        <ul className={s.container}>
          {casts.map(({ name, character, profile_path }, index) => (
            <li key={index} className={s.item}>
              <img
                src={
                  !!profile_path ? api.POSTER_URL + profile_path : unknownImage
                }
                width="128"
                alt={name}
              ></img>
              <p className={s.actorName}>{name}</p>
              <p className={s.actorCharacter}>{character}</p>
            </li>
          ))}
        </ul>
      )}

      {!casts.length && <p>No additional information.</p>}
    </>
  );
}
