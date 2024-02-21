import axios from "axios";
import "./Trailer.css";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { API_KEY, Movie_Key } from "../../apiConfig";

const Trailer = ({ trailer }) => {
  const [videoId, setVideoId] = useState("");
  const [trailerKEY, setTrailerKEY] = useState(trailer);
  // console.log(trailerKEY);
  // console.log(trailer);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await axios.get(
          `${Movie_Key}${trailer}/videos?api_key=${API_KEY}`
        );

        const resultsArray = response.data.results;
        let officialTrailerKey;

        for (let i = 0; i < resultsArray.length; i++) {
          const entry = resultsArray[i];

          if (entry.name === "Official Trailer") {
            officialTrailerKey = entry.key;
            break;
          }
        }

        if (officialTrailerKey) {
          // console.log("Official Trailer Key:", officialTrailerKey);
          setVideoId(officialTrailerKey);
        } else {
          // console.log("Official Trailer not found in the results array.");
          setVideoId("");
        }
      } catch (error) {
        // console.error("Error fetching trailer:", error);
        setVideoId("");
      }
    };

    fetchTrailer();
  }, [trailer]);

  const opts = {
    height: "100vh",
    width: "100%",
    playerVars: {
      autoplay: 1,
      controls: 1,
      showinfo: 0,
      modestbranding: 1,
      loop: 1,
      fs: 0,
      cc_load_policy: 0,
      iv_load_policy: 3,
      autohide: 0,
    },
  };

  const onReady = (event) => {};

  return (
    <>
      <div className="trailer-container">
        {videoId && (
          <YouTube
            videoId={videoId}
            opts={opts}
            onReady={onReady}
            className="TrailerClass"
          />
        )}
      </div>
    </>
  );
};

export default Trailer;
