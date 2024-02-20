import React from "react";
import Navbar from "./Component/Navbar/Navbar";
import MovieDetails from "./Try/Try";
import Hero from "./Component/Hero/Hero";
import MovieList from "./Try/Try";
import AllData from "./Component/AllData/AllData";
import Hero2 from "./Component/Hero/Hero2";
import MoviesComponent from "./Component/AllData/AllData";

const App = () => {
  return (
    <>
      <Navbar />
      <Hero2 />
      <MoviesComponent />
    </>
  );
};

export default App;
