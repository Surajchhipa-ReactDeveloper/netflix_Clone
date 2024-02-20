import { useEffect } from "react";
import { KEY_ACCESS_TOKEN } from "../Utility/constants";
// import { useParams } from "react-router-dom";
// import { useGetSingleUserQuery } from "./api/SingleUser/Single.api";

// useEffect(() => {
//   let _id = useParams(useGetSingleUserQuery);
// });
//BASE URL
// export const BASE_URL = "https://api.themoviedb.org/3/";
const BASE_URL = process.env.REACT_APP_BASE_URL;

// export const BASE_URL_API = "http:// 192.168.1.56:5000";

// ENDPOINTS URL
export const API_ENDPOINT_TRENDING =
  BASE_URL + "/trending/all/week?api_key=${API_KEY}&language=en-US";
export const API_ENDPOINT_ORIGINALS =
  API_ENDPOINT_USER + "/discover/movie?api_key=${API_KEY}&with_networks=213";
export const API_ENDPOINT_TOPRated =
  API_ENDPOINT_USER + "/movie/top_rated?api_key=${API_KEY}&language=en-US";
export const API_ENDPOINT_ACTION =
  BASE_URL + "/discover/movie?api_key=${API_KEY}&with_genres=28";
export const API_ENDPOINT_COMEDY =
  BASE_URL + "/discover/movie?api_key=${API_KEY}&with_genres=35";
export const API_ENDPOINT_HORROR =
  BASE_URL + "/discover/movie?api_key=${API_KEY}&with_genres=27";
export const API_ENDPOINT_ROMANCE =
  BASE_URL + "/discover/movie?api_key=${API_KEY}&with_genres=10749";
export const API_ENDPOINT_DocumenTaries =
  BASE_URL + "/discover/movie?api_key=${API_KEY}&with_genres=99";
