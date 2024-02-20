import React, { useEffect, useState } from "react";
import "./Hero.css";
// import { Images } from "../../Constant/ImagePath";
import { API_KEY, BASE_URL, BASE_URL_IMG } from "../../apiConfig";
import { useSelector } from "react-redux";

const Hero2 = () => {
  const Data = new Date().getFullYear();
  const [selectMovieId, setSelectMovieId] = useState();
  const selectedMovie = useSelector(
    (state) => state.SelectMovie.selectedMovieId
  );
  // console.log(selectedMovie);
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
      const maxRetries = 3;

      for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
        try {
          const startingValue = 255000;
          const maxValue = 100000;
          const Random =
            Math.floor(Math.random() * (maxValue - startingValue + 1)) +
            startingValue;
          const movieId = Random;

          const Url = `${BASE_URL}/movie/${
            movie == null ? movieId : selectedMovie.id
          }?api_key=${API_KEY}`;

          const response = await fetch(Url);

          console.log(Url);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          setMovie(data);
          return;
        } catch (error) {
          if (retryCount === maxRetries - 1) {
            console.error("Error fetching movie data:", error);
          }
          // Delay before retrying
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    };

    fetchData();
  }, [selectedMovie]);

  return (
    <>
      {movie ? (
        <div className="Hero_Container">
          <div className="Hero_Movie_poster">
            {movie ? (
              <img
                src={`https://image.tmdb.org/t/p/original${
                  movie.backdrop_path ? movie.backdrop_path : movie.poster_path
                }`}
                alt={
                  movie.poster_path
                    ? "movie.backdrop_path"
                    : "movie.poster_path"
                }
                className="Hero_Movies"
              />
            ) : (
              ""
            )}
          </div>
          <div className="Hero_Movie_poster_For_Mobile">
            {movie ? (
              <img
                src={`https://image.tmdb.org/t/p/original${
                  movie.poster_path ? movie.poster_path : movie.poster_path
                }`}
                alt={
                  movie.poster_path
                    ? "movie.poster_path"
                    : "movie.backdrop_path"
                }
                className="Hero_Movies"
              />
            ) : (
              ""
            )}
          </div>
          <div className="Hero_Item">
            <div className="Movie_Title">{movie.title}</div>
            <div className="Movies_Content">
              <div className="Release_Date MovieText">
                {formatReleaseDate(movie.release_date)} |
              </div>

              <div className="Timing MovieText">
                {formatRuntime(movie.runtime)} |
              </div>

              <div className="Type_of_Movie MovieText">
                {movie.genres.map((genre) => genre.name).join(", ")}
              </div>
            </div>
            <div className="Movie_OverView MovieText">
              {limitOverviewLength(movie.overview, 40)}
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
    </>
  );
};

export default Hero2;
