// import React, { useState, useEffect } from "react";

// const MovieDetails = () => {
//   const [movie, setMovie] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const apiKey = "81e7152c395c682bce718f13dbedc311";
//         const movieId = 19404;

//         const response = await fetch(
//           `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
//         );

//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }

//         const data = await response.json();
//         setMovie(data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []); // Empty dependency array to run the effect only once on component mount

//   console.log(movie);

//   return (
//     <div>
//       {movie ? (
//         <div>
//           <h1>{movie.title}</h1>
//           <p>{movie.overview}</p>
//           <img
//             src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
//             alt={movie.title}
//             style={{ width: "15rem", height: "15rem" }}
//           />
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default MovieDetails;

import React, { useEffect, useState } from "react";
import axios from "axios";

const MovieList = () => {
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [romanceMovies, setRomanceMovies] = useState([]);
  const [ComedyMovies, setComedyMovies] = useState([]);

  // console.log(horrorMovies);
  // console.log(romanceMovies);
  // console.log(ComedyMovies);
  useEffect(() => {
    const fetchMovies = async (genre, setState) => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/discover/movie",
          {
            params: {
              api_key: "81e7152c395c682bce718f13dbedc311",
              with_genres: genre,
            },
          }
        );
        setState(response.data.results);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    const getGenreIds = async (genres) => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/genre/movie/list",
          {
            params: {
              api_key: "81e7152c395c682bce718f13dbedc311",
            },
          }
        );
        const genreIds = genres.map((genre) => {
          const foundGenre = response.data.genres.find(
            (g) => g.name.toLowerCase() === genre.toLowerCase()
          );
          return foundGenre ? foundGenre.id : null;
        });
        return genreIds.filter(Boolean);
      } catch (error) {
        console.error("Error fetching genre IDs:", error);
        return [];
      }
    };

    const fetchAllMovies = async () => {
      const horrorGenreIds = await getGenreIds(["Horror"]);
      const romanceGenreIds = await getGenreIds(["Romance"]);
      const ComedyGenreIds = await getGenreIds(["Comedy"]);

      await fetchMovies(horrorGenreIds.join(","), setHorrorMovies);
      await fetchMovies(romanceGenreIds.join(","), setRomanceMovies);
      await fetchMovies(ComedyGenreIds.join(","), setComedyMovies);
    };

    fetchAllMovies();
  }, []);

  return (
    <div>
      <h2>Horror Movies</h2>
      <ul>
        {horrorMovies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>

      <h2>Romance Movies</h2>
      <ul>
        {romanceMovies.map((movie) => (
          <li key={movie.id}>
            {movie.title}
            <br />
            {movie.id}
          </li>
        ))}
      </ul>

      <h2>Comedy Movies</h2>
      <ul>
        {ComedyMovies.map((movie) => (
          <li key={movie.id}>
            {movie.title}
            <br />
            {movie.id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
