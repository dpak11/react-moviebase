import { MovieContext } from "../store/MovieContext";
import { useContext, useState, useEffect } from "react";
import { SearchPanel } from "./SearchPanel";
import Movie from "./Movie";
import "../css/movie-gallery.css";


const Gallery = () => {
  const [moviename, setMoviename] = useState("");
  const [sortType, setSortType] = useState({
    name: false,
    rating: false,
    runtime: false,
  });
  const { movies, setMovies, movieRef, tagsRef, visitedRef } =
    useContext(MovieContext);

  const movieSearch = (e) => {
    setMoviename(e.target.value);
  };

  const nameSearch = () => {
    if (moviename === "") return movieRef.current;
    return movieRef.current.filter((m) =>
      m.name.toLowerCase().includes(moviename.toLowerCase())
    );
  };

  const removeMovie = (id) => {
    movieRef.current = movieRef.current.filter((m) => m.id !== id);
    setMovies(setFilters());
  };

  const selectGenre = (genre, target) => {
    const tagIndex = tagsRef.current.indexOf(genre);
    if (tagIndex >= 0) {
      tagsRef.current.splice(tagIndex, 1);
    } else {
      tagsRef.current.push(genre);
    }
    target.classList.toggle("tag-selected");
    setMovies(setFilters());
  };

  const getTaggedMovieList = (movList) => {
    return movList.filter((m) =>
      tagsRef.current.every((tag) => m.genre.indexOf(tag) >= 0)
    );
  };

  const setFilters = () => {
    const searchedNames = nameSearch();
    const tagsFilter = getTaggedMovieList(searchedNames || []);
    return tagsFilter;
  };

  const fetchData = async () => {
    console.log("fetching data...");
    const data = await fetch(
      "https://api.mockaroo.com/api/671ec130?key=30660820"
    );
    const movies = await data.json();
    movieRef.current = movies;
    setMovies(movies);
  };

  const trimMovieName = (name) => {
    if (name.length > 20) {
      return `${name.substr(0, 19)}...`;
    }
    return name;
  };

  const toggleFullName = (e) => {
    const fullName = e.target.getAttribute("data-name");
    console.log(fullName, e.target.textContent);
    if (fullName.length > 20) {
      if (e.target.textContent === fullName) {
        e.target.textContent = `${fullName.substr(0, 19)}...`;
        return;
      }
    }
    e.target.textContent = fullName;
    return;
  };

  const sortby = (param) => {
    let mov = setFilters();
    setSortType(() => {
      return {
        name: false,
        rating: false,
        runtime: false,
        [param]: true,
      };
    });
    if (param === "runtime") {
      mov = mov.map((m) => ({
        ...m,
        runtime: Number(m.runtime.split(" ")[0]),
      }));
      mov.sort((a, b) => a.runtime - b.runtime);
    }
    if (param === "name") {
      mov.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
    }
    if (param === "rating") {
      mov.sort((a, b) => b.rating - a.rating);
    }
    setMovies(mov);
  };

  useEffect(() => {
    console.log("useEffect, movie name changed");
    setMovies(setFilters());
  }, [moviename]);

  useEffect(() => {
    tagsRef.current = [];
    if (!movieRef.current) {
      fetchData();
    } else {
      setMovies(movieRef.current);
    }
  }, []);

  let allGenres = movieRef.current
    ? movieRef.current.map((m) => m.genre.split("|"))
    : [];
  allGenres = allGenres.flat();
  allGenres = [...new Set(allGenres)].filter((g) => !g.includes("no genre"));
  allGenres.sort();

  const visitedPage = sessionStorage.getItem("page") || "";
  if (visitedPage) {
    const index = visitedRef.current.indexOf(visitedPage);
    if (index >= 0) {
      visitedRef.current.splice(index, 1);
    }
    visitedRef.current.push(visitedPage);
    sessionStorage.removeItem("page");
  }

  const noMovieText =
    movieRef.current && !movies.length
      ? "No Movies Found"
      : !movieRef.current
      ? "Loading..."
      : "";

  return (
    <div className="galleryStyle">
      <h1>Movie Gallery ({movies.length})</h1>
      <SearchPanel
        moviename={moviename}
        movieSearch={movieSearch}
        sortType={sortType}
        sortby={sortby}
        allGenres={allGenres}
        selectGenre={selectGenre}
      />
      <p>
        {visitedRef.current.map((page, i) => (
          <span
            onClick={toggleFullName}
            data-name={`${page}`}
            className="visitedStyle"
            key={i}
          >
            {trimMovieName(page)}
          </span>
        ))}
      </p>
      <hr style={{ borderColor: "grey" }} />

      <div className="tileStyle">
        {movies.length ? (
          movies.map((mov, i) => (
            <Movie
              key={i}
              movInfo={mov}
              removeMovie={removeMovie}
              isvisited={visitedRef.current.includes(mov.name)}
            />
          ))
        ) : (
          <p>
            <span>{noMovieText}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Gallery;
