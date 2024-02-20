import { configureStore } from "@reduxjs/toolkit";
import searchMovieReducer from "../Redux/Slice/Search.api";
import selectMovieReducer from "../Redux/Slice/Select.api";
const store = configureStore({
  reducer: {
    // Add other reducers if you have them
    movieSearch: searchMovieReducer,
    SelectMovie: selectMovieReducer,
  },
});

export default store;
