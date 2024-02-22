import axios from "axios";
import "./Trailer.css";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { API_KEY, Movie_Key } from "../../apiConfig";
import { createPortal } from "react-dom";
import { Images } from "../../Constant/ImagePath";

const Trailer = ({ trailer, closeModel, visible }) => {
  const [videoId, setVideoId] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Escape") {
      closeModel();
    }
  };
  const CloseModel = () => {
    closeModel();
  };
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [closeModel]);

  useEffect(() => {
    if (visible) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [visible]);

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
          setVideoId(officialTrailerKey);
        } else {
          setVideoId("");
        }
      } catch (error) {
        setVideoId("");
      }
    };

    fetchTrailer();
  }, [trailer]);

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      controls: 0,
      modestbranding: 1,
      disablekb: 0,
      showinfo: 0,
      loop: 0,
      autohide: 0,
      rel: 0,
      iv_load_policy: 0,
      fs: 1,
    },
  };

  const onReady = (event) => {};

  if (!visible) return null;

  return createPortal(
    <div className="trailer-container">
      <div className="Close_Icon" onClick={CloseModel}>
        <img src={Images.Close_Logo} alt="" className="Close_Logo" />
      </div>
      <div className="Video_Play_Container">
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={onReady}
          className="TrailerClass"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            objectFit: "fill",
          }}
        />
      </div>
    </div>,
    document.querySelector(".modal")
  );
};

export default Trailer;
