import React, { useEffect, useState } from "react";
import { MediaProduct } from "../../../../../shared/models/media-product";
import "./series.css";

function Series(): JSX.Element {
  const [allSeries, setSeries] = useState<MediaProduct[]>([]);

  useEffect(() => {
    const options: RequestInit = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:5000/series", options).then((res) => {
      res.json().then((series) => {
        let allSeries = series.data.map(
          (serie: any) => new MediaProduct(serie)
        );
        setSeries(allSeries);
      });
    });
  }, []);

  function onMoviePressed(media: MediaProduct): void { }
  return (
    <div className="fill-window" style={{ ...styles.container, flexDirection: 'column', flexWrap: 'wrap' }}>
      <h1>Series</h1>
      <div
      >
        {allSeries?.map((media: MediaProduct) => (
          <button key={media._id} style={styles.button} onClick={() => onMoviePressed(media)}>
            <img style={{ width: 128, height: 128 }} src={media.thumbnail_url} />
          </button>
        ))}
      </div>
    </div>
  );
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

export default Series;
