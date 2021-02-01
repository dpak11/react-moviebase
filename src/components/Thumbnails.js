import React, { useContext } from "react";
import { DataContext } from "../store/DataProvider";
import Thumb from "./Thumbs";

const Thumbnails = () => {
  const { selection } = useContext(DataContext);
  const dataList = {
    cars: [
      {
        name: "Bugatti",
        speed: "256kmps",
        color: "red",
      },
      {
        name: "McLaren",
        speed: "150kmps",
        color: "blue",
      },
      {
        name: "Toyota",
        speed: "110kmps",
        color: "black",
      },
    ],
    people: [
      {
        name: "Aravind",
        age: 22,
        location: "Sydney",
      },
      {
        name: "John",
        age: 40,
        location: "Japan",
      },
      {
        name: "Mark",
        age: 55,
        location: "USA",
      },
    ],
  };
  
  console.log("rendering Thumbnail");

  return (
    <div>
      <h2>{selection}</h2>
      <div style={{display:"flex"}}>
        {dataList[selection].map((data, i) => (
          <Thumb key={i} data={data} type={selection} />
        ))}
      </div>
    </div>
  );
};

export default Thumbnails;
