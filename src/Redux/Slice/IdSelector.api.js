// RowsSelectedMoviesID.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  RowsMovieID: null,
};

const RowsSelectedMoviesID = createSlice({
  name: "RowsMovieID",
  initialState,
  reducers: {
    RowsMovieIdLoad: (state, action) => {
      state.RowsMovieID = action.payload;
    },
  },
});

export const { RowsMovieIdLoad } = RowsSelectedMoviesID.actions;
export default RowsSelectedMoviesID.reducer;
