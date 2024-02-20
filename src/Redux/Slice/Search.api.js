import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchMovie: null,
};

const SearchMovieData = createSlice({
  name: "MovieDataSearch",
  initialState,
  reducers: {
    updateSearchMovie: (state, action) => {
      state.searchMovie = action.payload;
    },
  },
});

export const { updateSearchMovie } = SearchMovieData.actions;
export default SearchMovieData.reducer;
