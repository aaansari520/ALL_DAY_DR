import React from "react";
import Cart from "./Cart";
import Home from "./Home";
import NavBar from "./NavBar";

const SharedLayout = () => {
  return (
    <div>
      {/* <NavBar /> */}
      <Home />
      <Cart />
    </div>
  );
};

export default SharedLayout;
