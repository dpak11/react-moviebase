import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";

const Movie = ({ info, removeMovie }) => {
  const genreRef = useRef();

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
    background: "#92ab7c",
    marginBottom: "10px",
  };

  const genreStyle = {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "solid 1px #43476f",
    flexWrap: "wrap"
  };

  useEffect(() => {
    let g = info.genre.replace(/\|/g, "</span><span>");
    genreRef.current.innerHTML = `<span>${g}</span>`;
    console.log("info.genre changed");
  }, [info.genre]);

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
      <p ref={genreRef} style={genreStyle}></p>

      <p>{info.runtime}</p>

      <p>{info.country}</p>
      <p>{info.rating}%</p>
      <p>
        <button data-id={info.id} onClick={deleteMovie}>
          Delete
        </button>
      </p>
    </div>
  );
};

export default Movie;
