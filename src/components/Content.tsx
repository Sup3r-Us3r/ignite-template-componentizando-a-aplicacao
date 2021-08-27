import { useContext, useEffect } from "react";
import { IGenreResponseProps, IMovieProps, MovieContext } from "../contexts/MovieContext";
import { api } from "../services/api";
import { MovieCard } from "./MovieCard";

import '../styles/content.scss';

export function Content() {
  // Complete aqui
  const {
    movies,
    selectedGenre,
    handleSetSelectedGenre,
    selectedGenreId,
    handleSetMovies,
  } = useContext(MovieContext);

  useEffect(() => {
    api.get<IMovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      handleSetMovies(response.data);
    });

    api.get<IGenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      handleSetSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard
              key ={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  );
}