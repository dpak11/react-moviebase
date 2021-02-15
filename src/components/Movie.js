import { Link } from "react-router-dom";

const Movie = ({ info, removeMovie }) => {
  const deleteMovie = (e) => {
    const id = e.target.getAttribute("data-id");
    removeMovie(Number(id));
  };
  
  console.log("rendering Movie Item");
  const styles = {
    width: "250px",
    border: "1px solid #605c5c",
    padding: "10px 15px",
    borderRadius: "5px",
    background: "rgb(185 188 183)",
    marginBottom: "10px",
  };

  const genreStyle = {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "solid 1px #43476f",
    flexWrap: "wrap",
  };

  const genres = info.genre.split("|");

  return (
    <div style={styles}>
      <p style={{ textAlign: "center" }}>
        <img src={`${info.photos}`} alt="" />
      </p>
      <h3>
        <Link style={{ textDecoration: "none" }} to={`/details/${info.id}`}>
          {info.name}
        </Link>
      </h3>
      <p style={genreStyle}>
        {genres.map((genre,i) => (
          <span key={i} className="tags">{genre}</span>
        ))}
      </p>

      <p>{info.runtime}</p>

      <p>{info.country}</p>
      <p>{parseInt(info.rating)}%</p>
      <p>
        <button className="deleteBtn" data-id={info.id} onClick={deleteMovie}>
          Delete
        </button>
      </p>
    </div>
  );
};

export default Movie;
