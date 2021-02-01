import { useRef } from "react";
const Home = () => {
  const jsonRef = useRef();
  const style = {
    height: "80vh",
    backgroundColor: "#2D7064",
    fontSize: ".9em",
    padding: "20px",
    color: "#d8cfcf",
  };
  console.log("home rendererd");
  const fetchData = () => {
    //fetch("https://idhunammakadai.in/ionic-test/test-ionic-movie.php")
    fetch("test-ionic-movie.php")
      .then((data) => data.json())
      .then((json) => {
        console.log(json);
        jsonRef.current.innerHTML = JSON.stringify(json, null, 4);
      })
      .catch((err) => {
        console.log("unable to load");
        jsonRef.current.innerHTML = "Sorry, unable to fetch";
      });
  };

  return (
    <div style={style}>
      <h1>Welcome to Home Page!</h1>
      <p>
        The Gallery page will Load random list of movies from external API.
        Cache the movies after its loaded for the first time. Filter through the
        Movie names by typing in search TextField.
      </p>
      <p>
        For testing: To fetch data from internal API, click the button below
      </p>
      <button onClick={fetchData}>Get data from backend</button>
      <p>
        <pre ref={jsonRef}></pre>
      </p>
    </div>
  );
};

export default Home;
