import { Link } from "react-router-dom";

const Nav = () => {
  const style = {
    height: "10vh",
    backgroundColor: "rgb(69 189 168)",
    fontSize:"1.5em",
    padding: "10px",
    display: "flex",
    alignItems:"center",
    justifyContent:"space-around"
  };
  console.log("Head rendered");
  return (
    <div style={style}>
      <p>
        <Link to="/">Home</Link>
      </p>
      <p>
        <Link to="/gallery">Gallery</Link>
      </p>
    </div>
  );
};

export default Nav;
