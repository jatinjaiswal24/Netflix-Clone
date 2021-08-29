import React, { useState, useEffect } from "react";
import axios from "../axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const baseUrl = "https://image.tmdb.org/t/p/original/"; // generate a fully working image URL, you'll need 3 pieces of data. Those pieces are a base_url, a file_size and a file_path

function Row({ title, fetchUrl, islargerow }) {
  const [movies, setMovies] = useState([]);

  // a snippet of code which runs based on a specific condition/variable
  //By using this Hook, you tell React that your component needs to do something after render. React will remember the function you passed (we’ll refer to it as our “effect”), and call it later after performing the DOM updates.
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl); //this gives the base url that is in axios and along with the fetchUrl passed in props
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]); //here fetchUrl is used to tell useEffect that we are usig fetchUrl in above lines is a outside variable

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      settrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          settrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  const [trailerUrl, settrailerUrl] = useState("");
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {/* {several row posters} */}
        {movies.map((movie) => (
          <img
            className={`row_poster ${islargerow && "row_largeposter"}`}
            key="movie.id"
            src={`${baseUrl}${
              islargerow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
            // to show the trailer of the movie whose img is clicked
            onClick={() => handleClick(movie)}
          /> //to get poster of each movie from the movies array
        ))}
      </div>
      {/* when we have the trailerUrl then only play the youtube of that url  */}
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
