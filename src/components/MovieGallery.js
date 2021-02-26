import { MovieContext } from "../store/MovieContext";
import { useContext, useState, useEffect } from "react";
import Movie from "./Movie";

const galleryStyle = {
  minHeight: "80vh",
  backgroundColor: "#2D7064",
  fontSize: ".9em",
  padding: "20px",
};
const tileStyle = {
  backgroundColor: "#255E54",
  padding: "10px",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
};

const searchStyle = {
  padding: "10px",
  borderRadius: "5px",
  width: "20%",
  minWidth: "160px",
};
const genreStyle = {
  border: "1px solid grey",
  padding: "3px 5px",
  borderRadius: "7px",
  marginRight: "5px",
  marginBottom: "5px",
  backgroundColor: "rgb(64, 143, 129)",
  color: "#fff",
  cursor: "pointer",
};
const genreListing = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
};

const visitedStyle = {
  color: "#b8c1ea",
  padding: "2px 5px",
  border: "dashed 1px rgb(184, 193, 234)",
  marginRight: "5px",
  borderTop: "none",
  borderRadius: "5px",
  borderLeft: "none",
  display: "inline-block",
  cursor:"default"
};

const Gallery = () => {
  const [moviename, setMoviename] = useState("");
  const { movies, setMovies, movieRef, tagsRef, visitedRef } = useContext(
    MovieContext
  );

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
    const mlist = nameSearch();
    setMovies(getTaggedMovieList(mlist || []));
  };

  const selectGenre = (genre, target) => {
    const tagIndex = tagsRef.current.indexOf(genre);
    if (tagIndex >= 0) {
      tagsRef.current.splice(tagIndex, 1);
    } else {
      tagsRef.current.push(genre);
    }
    target.classList.toggle("tag-selected");
    setMovies(getTaggedMovieList(movieRef.current));
  };

  const getTaggedMovieList = (movList) => {
    return movList.filter((m) =>
      tagsRef.current.every((tag) => m.genre.indexOf(tag) >= 0)
    );
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

  const trimmer = (name) => {
    if (name.length > 20) {
      return `${name.substr(0, 19)}...`;
    }
    return name;
  };

  const toggleFullName = (e) => {
    const fullName = e.target.getAttribute("data-name");
    console.log(fullName,e.target.textContent);
    if (fullName.length > 20) {
      if (e.target.textContent == fullName) {
        e.target.textContent = `${fullName.substr(0, 19)}...`;
        return;
      }
    }
    e.target.textContent = fullName;
    return;
  };

  useEffect(() => {
    console.log("useEffect, movie name changed");
    const mlist = nameSearch();
    setMovies(getTaggedMovieList(mlist || []));
  }, [moviename]);

  useEffect(() => {
    console.log("gallery mounted", movieRef.current);
    tagsRef.current = [];
    if (!movieRef.current) {
      fetchData();
    } else {
      console.log("from Cache:", movieRef.current);
      setMovies(movieRef.current);
    }
  }, []);

  console.log("rendering gallery, useRef:", movieRef.current);
  let allGenres = movieRef.current
    ? movieRef.current.map((m) => m.genre.split("|"))
    : [];
  allGenres = [].concat.apply([], allGenres);
  allGenres = [...new Set(allGenres)].filter((g) => !g.includes("no genre"));
  allGenres.sort();

  const visitedPage = sessionStorage.getItem("page");
  if (visitedPage) {
    const index = visitedRef.current.indexOf(visitedPage);
    if (index >= 0) {
      visitedRef.current.splice(index, 1);
    }
    visitedRef.current.push(visitedPage);
    sessionStorage.removeItem("page");
  }

  return (
    <div style={galleryStyle}>
      <h1 style={{ color: "rgb(119, 216, 199)", textAlign: "center" }}>
        Movie Gallery ({movies.length})
      </h1>
      <p style={{ textAlign: "center" }}>
        <input
          style={searchStyle}
          type="text"
          value={moviename}
          onChange={movieSearch}
          placeholder="Type movie name..."
        />
      </p>
      <p style={genreListing}>
        {allGenres &&
          allGenres.map((genre, i) => (
            <span
              key={i}
              onClick={(e) => selectGenre(genre, e.target)}
              style={genreStyle}
            >
              {genre}
            </span>
          ))}
      </p>
      <p>
        {visitedRef.current.map((page, i) => (
          <span
            onClick={toggleFullName}
            data-name={`${page}`}
            style={visitedStyle}
            key={i}
          >
            {trimmer(page)}
          </span>
        ))}
      </p>
      <hr />

      <div style={tileStyle}>
        {movies.length ? (
          movies.map((mov, i) => (
            <Movie key={i} movInfo={mov} removeMovie={removeMovie} />
          ))
        ) : (
          <span style={{ display: !movieRef.current ? "block" : "none" }}>
            Loading...
          </span>
        )}
      </div>
    </div>
  );
};

export default Gallery;
