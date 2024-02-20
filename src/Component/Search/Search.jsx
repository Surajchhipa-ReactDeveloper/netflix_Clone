import React, { useEffect, useState } from "react";
import "./Hero.css";
import { Images } from "../../Constant/ImagePath";

const Search = () => {
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

export default Search;
