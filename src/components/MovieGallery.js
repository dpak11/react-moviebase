import { MovieContext } from "../store/MovieContext";
import { useContext, useState, useEffect } from "react";
import Movie from "./Movie";

const Gallery = () => {
  const [moviename, setMoviename] = useState("");
  const { movies, setMovies, movieRef } = useContext(MovieContext);
  //const movieRef = useRef(null);

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
    width: "30%",
    minWidth: "100px",
  };
  const genreStyle = {
    border: "1px solid grey",
    padding: "3px 5px",
    borderRadius: "7px",
    marginRight: "5px",
    backgroundColor: "rgba(255, 255, 0, 0.5)",
    color:"#fff"
  };
  const genreListing = {
    display:"flex",
    flexWrap: "wrap"
  };

  const movieSearch = (e) => {
    setMoviename(e.target.value);
  };
  const removeMovie = (id) => {
    movieRef.current = movieRef.current.filter((m) => m.id !== id);
    setMovies([...movieRef.current]);
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

  useEffect(() => {
    console.log("useEffect, movie name changed");
    setMovies(() => {
      if (moviename === "") return movieRef.current;
      return movieRef.current.filter((m) =>
        m.name.toLowerCase().includes(moviename.toLowerCase())
      );
    });
  }, [moviename]);

  useEffect(() => {
    console.log("gallery mounted", movieRef.current);
    if (!movieRef.current) {
      fetchData();
    } else {
      console.log("from Cache:", movieRef.current);
      setMovies(movieRef.current);
    }
  }, []);

  console.log("rendering gallery, useRef:", movieRef.current);
  let allGenres = movieRef.current ? movieRef.current.map((m) => m.genre.split("|")) : [];
  allGenres = [].concat.apply([],allGenres);
  allGenres = [...new Set(allGenres)];
  console.log(allGenres);
  return (
    <div style={galleryStyle}>
      <h1 style={{ color: "rgb(119, 216, 199)", textAlign: "center" }}>
        Movie Gallery
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
          allGenres.map((genre, i) => <span style={genreStyle}>{genre}</span>)}
      </p>
      <hr />
      <div style={tileStyle}>
        {movies
          ? movies.map((mov, i) => (
              <Movie key={i} info={mov} removeMovie={removeMovie} />
            ))
          : "Loading..."}
      </div>
    </div>
  );
};

export default Gallery;
