import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ENDPOINT_LOGIN, BASE_URL } from "../../apiTypes";
import { API_ENDPOINT_ACTION } from "../../Slice/ApiType";

export const Action_API = createApi({
  reducerPath: "Action_API",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    // prepareHeaders: (headers) => {
    //   return header(headers);
    // },
    // timeout: 5000,
  }),
  tagTypes: ["Action"],
  endpoints: (Movie) => ({
    GetActionMovies: Movie.query({
      query: (payload) => ({
        url: API_ENDPOINT_ACTION,
        method: "GET",
        body: payload,
      }),
      providesTags: ["Action"],
    }),
  }),
});

export const { GetActionMoviesQuery } = Action_API;
