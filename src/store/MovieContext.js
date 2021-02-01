import { createContext, useState, useRef } from "react";

export const MovieContext = createContext();
/* const MovieList = [{
    name:"Jumanji",
    runtime:"50 mins",
    release:"2 Jan 2020",
    id:1
},{
    name:"KillBill",
    runtime:"150 mins",
    release:"20 Dec 2011",
    id:2
},{
    name:"Scarface",
    runtime:"120 mins",
    release:"5 Jan 1990",
    id:3
},{
    name:"Hitman",
    runtime:"145 mins",
    release:"12 Mar 2010",
    id:4
}]; */

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const movieRef = useRef(null);
  //const [cachedMovies, setCached] = useState(null);
  return (
    <MovieContext.Provider value={{ movies, setMovies, movieRef }}>
      {children}
    </MovieContext.Provider>
  );
};
