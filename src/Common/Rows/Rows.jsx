import axios from "axios";
import "./Rows.css";
import React, { useEffect, useState } from "react";
import { BASE_URL_IMG } from "../../apiConfig";
import { useSelector } from "react-redux";
import Trailer from "../../Component/Trailer/Trailer";

const Rows = ({ title, TypeMovie, isLargeRow, moviesData }) => {
  const [movies, setMovies] = useState([]);
  const [trailer, setTrailer] = useState(null);

  const handleClick = (movie) => {
    // console.log("THE KEY OF MOVIES IS >>>", movie.id, movie);
    setTrailer(movie.id);
  };

  return (
    <>
      <div className="Rows_Main_Container">
        <div className="Rows_Main_Title">{title}</div>
        <div className="Row__posters">
          {TypeMovie?.map((movie) => (
            <img
              key={movie.id}
              onClick={() => handleClick(movie)}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={`${BASE_URL_IMG}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />
          ))}
        </div>
        <Trailer trailer={trailer} />
      </div>
    </>
  );
};

export default Rows;

// const fetchData = async () => {
//   try {
//     const response = await axios.get(fetchUrl);
//     setMovies(response.data.results);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };
// console.log(movies);

// useEffect(() => {
//   if (fetchUrl) {
//     fetchData();
//   }
// }, [fetchUrl]);
// const base_url = "https://image.tmdb.org/t/p/original/";

// console.log(BASE_URL_IMG);
