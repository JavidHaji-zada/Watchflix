import React, { useEffect, useState } from "react";
import { Col, Form, InputGroup, Button } from "react-bootstrap";
import { FaHandMiddleFinger } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { Channel } from "../../../../../shared/models/channel";
import { MediaProduct } from "../../../../../shared/models/media-product";

import { useHistory } from "react-router-dom";

function Series(): JSX.Element {
    
    const [selfSeries, setSeries] = useState<MediaProduct[]>([]);

    useEffect(() => {
        let mediaProduct1 = new MediaProduct({
          _id: "id1",
          score: 5,
          release_date: new Date(),
          name: "Kung Fu Panda",
          thumbnail_url: "https://img1.evosis.org/movie/629/icon/icon0.png",
        });
        let mediaProduct15 = new MediaProduct({
            _id: "id1",
            score: 5,
            release_date: new Date(),
            name: "Kung Fu Panda",
            thumbnail_url: "https://img1.evosis.org/movie/629/icon/icon0.png",
          });
          let mediaProduct13 = new MediaProduct({
            _id: "id1",
            score: 5,
            release_date: new Date(),
            name: "Kung Fu Panda",
            thumbnail_url: "https://img1.evosis.org/movie/629/icon/icon0.png",
          });
          let mediaProduct14 = new MediaProduct({
            _id: "id1",
            score: 5,
            release_date: new Date(),
            name: "Kung Fu Panda",
            thumbnail_url: "https://img1.evosis.org/movie/629/icon/icon0.png",
          });
        let mediaProduct11 = new MediaProduct({
            _id: "id1",
            score: 5,
            release_date: new Date(),
            name: "Kung Fu Panda",
            thumbnail_url: "https://img1.evosis.org/movie/629/icon/icon0.png",
          });
          let mediaProduct12 = new MediaProduct({
            _id: "id1",
            score: 5,
            release_date: new Date(),
            name: "Kung Fu Panda",
            thumbnail_url: "https://img1.evosis.org/movie/629/icon/icon0.png",
          });
          let mediaProduct23 = new MediaProduct({
            _id: "id1",
            score: 5,
            release_date: new Date(),
            name: "Kung Fu Panda",
            thumbnail_url: "https://img1.evosis.org/movie/629/icon/icon0.png",
          }); 
          let mediaProduct21 = new MediaProduct({
            _id: "id1",
            score: 5,
            release_date: new Date(),
            name: "Kung Fu Panda",
            thumbnail_url: "https://img1.evosis.org/movie/629/icon/icon0.png",
          }); 
        let mediaProduct2 = new MediaProduct({
          _id: "id2",
          score: 5,
          release_date: new Date(),
          name: "Inception",
          thumbnail_url:
            "https://bsaber.com/wp-content/uploads/2019/05/18598-20226.jpg",
        });
        let mediaProduct3 = new MediaProduct({
          _id: "id3",
          score: 4.7,
          release_date: new Date(),
          name: "Tenet",
          thumbnail_url:
            "https://images.pexels.com/users/avatars/3485071/watch-online-tenet-2020-free-hd-full-movie-969.jpeg?w=256&h=256&fit=crop&auto=compress",
        });
        let series = []
        series.push(mediaProduct1,mediaProduct11, mediaProduct13, mediaProduct14, mediaProduct12, mediaProduct23, mediaProduct21,mediaProduct2, mediaProduct3, mediaProduct3)
        setSeries(series);
    

      }, []);

      function onMoviePressed(media: MediaProduct): void {}
    return(
        <div className="fill-window" style={styles.container}>
      
        
        <div
          style={{ display: "flex", flexDirection: "row", alignItems: "left", overflow: "scroll", flexWrap: "wrap"}}
        >
          {selfSeries?.map((media: MediaProduct) => (
            <button style={styles.button} onClick={() => onMoviePressed(media)}>
              <img src={media.thumbnail_url} />
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
      backgroundColor: "transparent",
      borderWidth: 0,
    },
    continueWatch: {
      display: "flex",
      height: 180,
    },
  };

  
export default Series;
