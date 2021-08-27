import { createContext, useState } from 'react';

export interface IMovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export interface IGenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export interface IMovieContextProps {
  children: React.ReactNode;
}

interface IMovieProviderData {
  movies: IMovieProps[];
  handleSetMovies: (moviesData: IMovieProps[]) => void;
  genres: IGenreResponseProps[];
  handleSetGenres: (genresData: IGenreResponseProps[]) => void;
  selectedGenre: IGenreResponseProps;
  handleSetSelectedGenre: (genreData: IGenreResponseProps) => void;
  selectedGenreId: number;
  handleSetGenreId: (id: number) => void;
}

export const MovieContext = createContext({} as IMovieProviderData);

export const MovieProvider = ({ children }: IMovieContextProps) => {
  const [movies, setMovies] = useState<IMovieProps[]>([]);
  const [genres, setGenres] = useState<IGenreResponseProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<IGenreResponseProps>({} as IGenreResponseProps);
  const [selectedGenreId, setSelectedGenreId] = useState<number>(1);

  function handleSetMovies(moviesData: IMovieProps[]) {
    setMovies(moviesData);
  }

  function handleSetGenres(genresData: IGenreResponseProps[]) {
    setGenres(genresData);
  }

  function handleSetSelectedGenre(genreData: IGenreResponseProps) {
    setSelectedGenre(genreData);
  }

  function handleSetGenreId(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <MovieContext.Provider value={{
      genres,
      handleSetGenreId,
      handleSetGenres,
      handleSetMovies,
      handleSetSelectedGenre,
      movies,
      selectedGenre,
      selectedGenreId,
    }}>
      {children}
    </MovieContext.Provider>
  );
};
