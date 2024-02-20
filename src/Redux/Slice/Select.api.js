// selectedMovieIdSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMovieId: null,
};

const selectedMovieIdSlice = createSlice({
  name: "selectedMovieId",
  initialState,
  reducers: {
    SelectedMovieIdLoad: (state, action) => {
      state.selectedMovieId = action.payload;
    },
  },
});

export const { SelectedMovieIdLoad } = selectedMovieIdSlice.actions;
export default selectedMovieIdSlice.reducer;
