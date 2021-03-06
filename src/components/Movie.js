import { Link } from "react-router-dom";

const styles = {
  width: "250px",
  border: "1px solid #605c5c",
  padding: "10px 15px",
  borderRadius: "10px",
  background: "rgb(60, 166, 147)",
  marginBottom: "10px",
};

const genreStyle = {
  display: "flex",
  justifyContent: "space-between",
  borderBottom: "solid 1px #43476f",
  flexWrap: "wrap",
};

const Movie = ({ movInfo, removeMovie }) => {
  const deleteMovie = (e) => {
    const id = e.target.getAttribute("data-id");
    removeMovie(Number(id));
  };

  console.log("rendering Movie Item");
  const genres = movInfo.genre.split("|");
  const runtime =
    typeof movInfo.runtime === "number"
      ? `${movInfo.runtime} mins`
      : movInfo.runtime;

  return (
    <div style={styles}>
      <p style={{ textAlign: "center" }}>
        <img src={`${movInfo.photos}`} alt="" />
      </p>
      <h3>
        <Link style={{ textDecoration: "none" }} to={`/details/${movInfo.id}`}>
          {movInfo.name}
        </Link>
      </h3>
      <p style={genreStyle}>
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
