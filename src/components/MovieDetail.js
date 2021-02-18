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
  const genres = movie.genre.split("|");
  return (
    <div style={myStyle}>
      <div>
        <h4 style={{color:"grey"}}>MOVIE DETAILS:</h4>
        <h1>{movie.name}</h1>
        <p>{movie.runtime}</p>
        <p>{movie.release}</p>
        <p>
          {genres.map((genre,i) => (
            <span key={i} className="tags">{genre}</span>
          ))}
        </p>
        <p>{movie.country}</p>
        <p>{movie.rating}%</p>
        <Link to="/gallery">Go Back</Link>
      </div>
    </div>
  );
};

export default MovieDetail;
