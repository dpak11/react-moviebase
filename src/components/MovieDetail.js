import { Link } from "react-router-dom";
import { MovieContext } from "../store/MovieContext";
import { useContext } from "react";

const myStyle = {
  height: "70vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const ratingText = {
  fontSize:"2.4em",
  fontWeight:"bold"
};

const MovieDetail = ({ match }) => {
  const { movies } = useContext(MovieContext);
  const movie = movies.find((m) => m.id === Number(match.params.id));
 
  sessionStorage.setItem("page", movie.name);
  const genres = movie.genre.split("|");
  let colorRate = Number(movie.rating) > 50 ? "rate-grey" : "rate-pale";
  colorRate = Number(movie.rating) >= 85 ? "rate-red" : colorRate;
  return (
    <div style={myStyle}>
      <div>
        <h4 style={{color:"grey"}}>MOVIE DETAILS:</h4>
        <h1 style={{borderBottom: "dotted 2px gray"}}>{movie.name}</h1>        
        <p>
          {genres.map((genre,i) => (
            <span key={i} className="tags" style={{marginRight:"10px"}}>Genre: {genre}</span>
          ))}
        </p>
        <p>Run Time: <b>{movie.runtime}</b></p>
        <p>Release Date: <b>{movie.release}</b></p>
        <p>Country: <b>{movie.country}</b></p>
        <p><span className={colorRate} style={ratingText}>{movie.rating}%</span></p>
        <Link to="/gallery">&lt; Go Back</Link>
      </div>
    </div>
  );
};

export default MovieDetail;
