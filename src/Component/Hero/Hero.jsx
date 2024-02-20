import React, { useEffect, useState } from "react";
import "./Hero.css";
import { Images } from "../../Constant/ImagePath";

const Hero = () => {
  const Data = new Date().getFullYear();
  const [movie, setMovie] = useState(null);

  function limitOverviewLength(overview, limit) {
    const words = overview.split(/\s+/);
    const limitedWords = words.slice(0, limit);
    const truncatedOverview = limitedWords.join(" ");
    return truncatedOverview;
  }

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };
  const formatReleaseDate = (dateString) => {
    const formattedDate = new Date(dateString);
    return formattedDate.toLocaleDateString("en-US", { year: "numeric" });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = "81e7152c395c682bce718f13dbedc311";
        const startingValue = 25500;
        const maxValue = 100000;
        const Random =
          Math.floor(Math.random() * (maxValue - startingValue + 1)) +
          startingValue;
        const movieId = Random;

        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once on component mount
  // console.log(movie);

  return (
    <header>
      {movie ? (
        <div className="Hero_Container">
          <div className="Hero_Movie_poster">
            <img
              src={`https://image.tmdb.org/t/p/original${
                movie.backdrop_path ? movie.backdrop_path : movie.poster_path
              }`}
              alt={
                movie.backdrop_path
                  ? "movie.backdrop_path"
                  : "movie.poster_path"
              }
              className="Hero_Movies"
            />
          </div>
          <div className="Hero_Item">
            <div className="Movie_Title">{movie.title}</div>
            <div className="Movies_Content">
              <div className="Release_Date MovieText">
                {formatReleaseDate(movie.release_date)}
              </div>
              |
              <div className="Timing MovieText">
                {formatRuntime(movie.runtime)}
              </div>
              |
              <div className="Type_of_Movie MovieText">
                {movie.genres.map((genre) => genre.name).join(", ")}
              </div>
            </div>
            <div className="Movie_OverView MovieText">
              {limitOverviewLength(movie.overview, 50)}
            </div>
            {movie &&
            movie.production_companies &&
            movie.production_companies.length > 0 ? (
              <div className="Pro_Name MovieText">
                Production Name : {movie.production_companies[0].name}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="Hero_background_Container"></div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </header>
  );
};

export default Hero;
