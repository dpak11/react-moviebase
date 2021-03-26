import React from "react";

const Header = () => {
  console.log("rendering header");
  return (
    <div className="header">
       <ul>
          <li>About</li>
          <li>Contact</li>
          <li>Listing</li>
        </ul>      
    </div>
  );
};

export default Header;
