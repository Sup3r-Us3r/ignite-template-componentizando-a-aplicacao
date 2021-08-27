import { useContext, useEffect, useState } from "react";
import { IGenreResponseProps, MovieContext } from "../contexts/MovieContext";
import { api } from "../services/api";
import { Button } from "./Button";

import '../styles/sidebar.scss';

export function SideBar() {
  const {
    handleSetGenres,
    selectedGenreId,
    handleSetGenreId,
    genres,
  } = useContext(MovieContext);

  useEffect(() => {
    api.get<IGenreResponseProps[]>('genres').then(response => {
      handleSetGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleSetGenreId(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}