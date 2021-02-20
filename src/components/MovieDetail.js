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
        <p>
          {genres.map((genre,i) => (
            <span key={i} className="tags" style={{marginRight:"10px"}}>Genre: {genre}</span>
          ))}
        </p>
        <p>Run Time: {movie.runtime}</p>
        <p>Release Date: {movie.release}</p>
        <p>Country: {movie.country}</p>
        <p>Rating: {movie.rating}%</p>
        <Link to="/gallery">&lt; Go Back</Link>
      </div>
    </div>
  );
};

export default MovieDetail;
