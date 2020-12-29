import React, { useEffect, useState } from "react";
import { MediaProduct } from "../../../../../shared/models/media-product";

import { useHistory } from "react-router-dom";

function Movie(): JSX.Element {
  const history = useHistory()

  const [movies, setMovies] = useState<MediaProduct[]>([]);

  useEffect(() => {
    const options: RequestInit = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:5000/movies", options).then((res) => {
      res.json().then((movies) => {
        let allMovies = movies.data.map(
          (movie: any) => new MediaProduct(movie)
        );
        setMovies(allMovies);
      });
    });
  }, []);

  function onMoviePressed(media: MediaProduct): void {
    history.push(`/browse/${media._id}`)
  }
  return (
    <div className="fill-window" style={{ ...styles.container, flexDirection: 'column', flexWrap: 'wrap' }}>
      <h1>Movies</h1>
      <div
        style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
      >
        {movies?.map((media: MediaProduct) => (
          <button key={media._id} style={styles.button} onClick={() => onMoviePressed(media)}>
            <img style={{ width: 128, height: 128 }} src={media.thumbnail_url} />
            <p style={{ color: 'white' }}>{media.name}</p>
          </button>
        ))}
      </div>

    </div>
  )
}

const styles = {
  container: {
    display: "flex",
    backgroundColor: "#333333",
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 24,
  },
  channelContainer: {
    flex: 1,
    maxHeight: 180,
  },
  channelName: {
    color: "white",
    margin: 0,
  },
  thumbnailStyle: {
    width: 128,
    height: 128,
  },
  button: {
    height: 140,
    width: 140,
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  continueWatch: {
    display: "flex",
    height: 180,
  },
};


export default Movie;
