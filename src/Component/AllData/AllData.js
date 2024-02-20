import React, { useEffect, useState } from "react";
import Rows from "../../Common/Rows/Rows";
import Request from "../../Common/APIPoints/Points";
import axios from "axios";
import Hero from "../Hero/Hero";
import { useSelector } from "react-redux";

const AllData = () => {
  // All type category State

  const [trending, setTrending] = useState([]);
  const [original, setOriginal] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [action, setAction] = useState([]);
  const [ComedyMovies, setComedyMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [romanceMovies, setRomanceMovies] = useState([]);
  const [documentaries, setDocumentaries] = useState([]);
  const [openRow, setOpenRow] = useState(true);
  const SearchMovieData = useSelector((state) => state.movieSearch.searchMovie);
  const [searchMovie, setSearchMovie] = useState(SearchMovieData);
  // console.log(SearchMovieData);

  useEffect(() => {
    const fetchMovies = async (genre, setState) => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/discover/movie",
          {
            params: {
              api_key: "81e7152c395c682bce718f13dbedc311",
              with_genres: genre,
              // sort_by: esc",
            },
          }
        );
        setState(response.data.results);

        // console.log(response.data);
      } catch (error) {
        // console.error("Error fetching movies:", error);
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
      const bollywoodGenres = ["Drama", "Romance"];
      const bollywoodGenreIds = await getGenreIds(bollywoodGenres);
      const trendingGenreIds = await getGenreIds(["trending"]);
      const originalGenreIds = await getGenreIds(["original"]);
      const topRatedGenreIds = await getGenreIds(["topRated"]);
      const actionGenreIds = await getGenreIds(["action"]);
      // const ComedyMoviesGenreIds = await getGenreIds(["ComedyMovies"]);
      const HorrorGenreIds = await getGenreIds(["Horror"]);
      const romanceGenreIds = await getGenreIds(["Romance"]);
      const ComedyGenreIds = await getGenreIds(["Comedy"]);
      const DocumentariesGenreIds = await getGenreIds(["setDocumentaries"]);

      await fetchMovies(trendingGenreIds.join(","), setTrending);
      await fetchMovies(originalGenreIds.join(","), setOriginal);
      await fetchMovies(topRatedGenreIds.join(","), setTopRated);
      await fetchMovies(actionGenreIds.join(","), setAction);
      // await fetchMovies(ComedyMoviesGenreIds.join(","), setComedyMovies);
      await fetchMovies(HorrorGenreIds.join(","), setHorrorMovies);
      await fetchMovies(romanceGenreIds.join(","), setRomanceMovies);
      await fetchMovies(ComedyGenreIds.join(","), setComedyMovies);
      await fetchMovies(DocumentariesGenreIds.join(","), setDocumentaries);
    };

    fetchAllMovies();
  }, []);

  useEffect(() => {
    if (!SearchMovieData) {
      setOpenRow(true);
    } else {
      setOpenRow(false);
    }
  }, [SearchMovieData]);
  return (
    <>
      <div className="All_Data_container">
        <div className="Block" style={{ display: "none" }}>
          <Hero trending={trending} />
        </div>

        {/* {SearchMovieData ? (
          <Rows
            title={`${!SearchMovieData ? "Search Movies" : ""}`}
            TypeMovie={SearchMovieData}
          />
        ) : (
          ""
        )} */}
        <Rows title="NETFLIX ORIGINALS" TypeMovie={trending} isLargeRow />
        <Rows title="Trending Now" TypeMovie={original} />
        <Rows title="Top Rated" TypeMovie={topRated} />
        <Rows title="Action Movies" TypeMovie={action} />
        <Rows title="Comedy Movies" TypeMovie={ComedyMovies} />
        <Rows title="Horror Movies" TypeMovie={horrorMovies} />
        <Rows title="Romance Movies" TypeMovie={romanceMovies} isLargeRow />
        <Rows title="Documentaries" TypeMovie={documentaries} />
      </div>
    </>
  );
};

export default AllData;
{
  /* <Rows
          title="NETFLIX ORIGINALS"
          fetchUrl={Request.fetchNetflixOriginals}
          isLargeRow
        /> */
}
{
  /* <Rows title="Trending Now" fetchUrl={Request.Trending} /> */
}
{
  /* <Rows title="Top Rated" fetchUrl={Request.TopRated} />
        <Rows title="Action Movies" fetchUrl={Request.ActionMovie} />
        <Rows title="Comedy Movies" fetchUrl={Request.ComedyMovie} />
        <Rows title="Horror Movies" fetchUrl={Request.HorrorMovie} />
        <Rows title="Romance Movies" fetchUrl={Request.RomanceMovie} />
        <Rows title="Documentaries" fetchUrl={Request.Documentaries} /> */
}

{
  /* <Rows title="NETFLIX ORIGINALS" trending={trending} />
        <Rows title="Trending Now" original={original} />
        <Rows title="Top Rated" topRated={topRated} />
        <Rows title="Action Movies" action={action} />
        <Rows title="Comedy Movies" ComedyMovies={ComedyMovies} />
        <Rows title="Horror Movies" horrorMovies={horrorMovies} />
        <Rows title="Romance Movies" romanceMovies={romanceMovies} />
        <Rows title="Documentaries" documentaries={documentaries} /> */
}
