import { Link } from "react-router-dom";
import { MovieContext } from "../store/MovieContext";
import { useContext } from "react";

const MovieDetail = ({ match }) => {
  const { movies } = useContext(MovieContext);
  const movie = movies.find((m) => m.id === Number(match.params.id));
  const myStyle = {
    height: "70vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  return (
    <div style={myStyle}>
      <div>
        <h1>Movie Details:</h1>
        <p>{movie.name}</p>
        <p>{movie.runtime}</p>
        <p>{movie.release}</p>
        <p>{movie.genre}</p>
        <p>{movie.country}</p>
        <p>{movie.rating}%</p>
        <Link to="/gallery">Go Back</Link>
      </div>
    </div>
  );
};

export default MovieDetail;
