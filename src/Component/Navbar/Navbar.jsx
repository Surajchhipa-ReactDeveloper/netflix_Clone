import React, { useState, useEffect } from "react";
import "./Navbar.css";
import axios from "axios";
import { Images } from "../../Constant/ImagePath";
import { API_KEY } from "../../apiConfig";
import { useDispatch, useSelector } from "react-redux";
import { updateSearchMovie } from "../../Redux/Slice/Search.api";
import { SelectedMovieIdLoad } from "../../Redux/Slice/Select.api";

const YourComponent = () => {
  const [NavShow, setNavShow] = useState(false);
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const SearchMovieData = useSelector((state) => state.movieSearch.searchMovie);
  const [searchMovie, setSearchMovie] = useState(SearchMovieData);
  const [openBar, setOpenBar] = useState(!false);
  const dispatch = useDispatch();
  const dispatch2 = useDispatch();
  const HandleSearchMovie = (event) => {
    setSearch(event.target.value);
  };
  useEffect(() => {
    const handleSearchMovie = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1&api_key=${API_KEY}`
        );

        // console.log(response.data.results);
        setOpenBar(true);
        dispatch(updateSearchMovie(response.data.results));
      } catch (error) {
        console.error("Error fetching movie data:", error);
        setOpenBar(false);
      }
    };
    handleSearchMovie();
  }, [search]);

  const HandleSelectMovie = (id) => {
    console.log("Selected movie ID:", id.id);
    dispatch2(SelectedMovieIdLoad(id));
  };
  return (
    <>
      <div className={`Navbar_Container ${NavShow && "nav__black"}`}>
        <div className="Navbar_Left_Side">
          <img src={Images.Main_Logo} alt="" className="Main_Logo" />
        </div>

        <div className="Navbar_Right_Side">
          <div className="Movie_Input_Container">
            <input
              className="Search"
              placeholder="Search..."
              value={search}
              onChange={HandleSearchMovie}
            />
          </div>
          {openBar && SearchMovieData && SearchMovieData.length > 0 && (
            <div className="Movie_Data_Container">
              {SearchMovieData.map((film, id) => (
                <h1
                  className="Search_Movie_Name"
                  key={film.id}
                  onClick={() => HandleSelectMovie(film)}
                >
                  {film ? film.title : "Movie Not Found"}
                </h1>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default YourComponent;
