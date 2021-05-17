import { Link } from "react-router-dom";
import '../css/movie.css';

const Movie = ({ movInfo, removeMovie, isvisited }) => {
  const deleteMovie = (e) => {
    const id = e.target.getAttribute("data-id");
    removeMovie(Number(id));
  };

  console.log("rendering Movie Item");
  const genres = movInfo.genre.split("|");
  const runtime = typeof movInfo.runtime === "number" ? `${movInfo.runtime} mins` : movInfo.runtime;

  return (
    <div className={isvisited ? "movieBlock isChecked" : "movieBlock"}>
      <p style={{ textAlign: "center" }}>
        <img src={`${movInfo.photos}`} alt="" />
      </p>
      <h3>
        <Link style={{ textDecoration: "none" }} to={`/details/${movInfo.id}`}>
          {movInfo.name}
        </Link>
      </h3>
      <p className="genre-block">
        {genres.map((genre, i) => (
          <span key={i} className="tags">
            {genre}
          </span>
        ))}
      </p>

      <p>{runtime}</p>
      <p>{movInfo.country}</p>
      <p>{Number(movInfo.rating)}%</p>
      <p>
        <button
          className="deleteBtn"
          data-id={movInfo.id}
          onClick={deleteMovie}
        >
          Delete
        </button>
      </p>
    </div>
  );
};

export default Movie;
