import '../css/search-panel.css';

export const SearchPanel = ({moviename,movieSearch,sortType, sortby, allGenres, selectGenre}) => {
  return (
    <>
      <p style={{ textAlign: "center" }}>
        <input
          className="searchStyle"
          type="text"
          value={moviename}
          onChange={(e) => movieSearch(e)}
          placeholder="Type movie name..."
        />
      </p>
      <p className="sortSection">
        <label>Sort By :</label>
        <span
          className={sortType.rating ? "active" : ""}
          onClick={() => sortby("rating")}
        >
          Rating
        </span>
        &nbsp; | &nbsp;
        <span
          className={sortType.name ? "active" : ""}
          onClick={() => sortby("name")}
        >
          Name
        </span>
        &nbsp; | &nbsp;
        <span
          className={sortType.runtime ? "active" : ""}
          onClick={() => sortby("runtime")}
        >
          Duration
        </span>
      </p>
      <p className="genreListing">
        {allGenres &&
          allGenres.map((genre, i) => (
            <span
              key={i}
              onClick={(e) => selectGenre(genre, e.target)}
              className="genreStyle"
            >
              {genre}
            </span>
          ))}
      </p>
    </>
  );
};
