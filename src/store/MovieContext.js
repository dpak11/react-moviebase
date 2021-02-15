import { createContext, useState, useRef } from "react";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const movieRef = useRef(null);
  const tagsRef = useRef([]);
  return (
    <MovieContext.Provider value={{ movies, setMovies, movieRef, tagsRef }}>
      {children}
    </MovieContext.Provider>
  );
};
