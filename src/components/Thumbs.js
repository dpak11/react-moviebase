import React from "react";

const Thumbs = ({ data, type }) => {
  console.log("rendering Thumbs");
  const key1 = Object.keys(data)[0];
  const key2 = Object.keys(data)[1];
  const key3 = Object.keys(data)[2];
  const thumbTitle = {
    color: "blue",
    padding: "15px 0 5px",
    fontSize: "1.5em",
  };
  const thumbStyle = {
    marginTop: "10px",
    border: "2px solid #e4e1dc",
    padding:"0 10px",
    backgroundColor: "#FFFF00",
  };
  return (
    <div style={thumbStyle}>
      <h4 style={thumbTitle}>{data[key1]}</h4>
      <p>{data[key2]}</p>
      <h5 style={{color:"#a4b576", borderRadius:"5px"}}>{data[key3]}</h5>
    </div>
  );
};

export default Thumbs;
