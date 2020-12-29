import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import "./channel.css";
import { Channel } from "../../../shared/models/channel";
import { MediaProduct } from "../../../shared/models/media-product";

import { useHistory } from "react-router-dom";
import Media from "../../../shared/components/media";

function ChannelPage(props: any): JSX.Element {
  const history = useHistory();
  const [channelID, setChannelID] = useState("");
  const [lastMovie, setLastMovie] = useState<MediaProduct>();
  const [currentChannel, setChannel] = useState<Channel>();
  const [channelLoading, setChannelLoading] = useState(true)
  const [mediasLoading, setMediasLoading] = useState(true)

  useEffect(() => {
    let _id = props.match.params.id
    console.log("id ", _id)
    const options: RequestInit = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
    fetch(`http://localhost:5000/channel/${_id}`, options)
      .then(res => {
        res.json().then(result => {
          console.log('result ', result)
          if (result.failed) {
          } else if (result.success) {
            let channel = new Channel(result.data)
            setChannelLoading(false)
            fetch(`http://localhost:5000/medias/${_id}`, options)
              .then(res => {
                res.json().then(result => {
                  if (result.failed) {
                  } else if (result.success) {
                    let medias = result.data.map((media: any) => new MediaProduct(media))
                    channel.medias = medias
                    console.log('channel is ', channel)
                    setChannel(channel)
                    setMediasLoading(false)
                  }
                })
                  .catch(err => {
                    console.log('err ', err)
                  })
              })
              .catch(err => {
                console.log('err ', err)
              })
          }
        })
      })

  }, []);

  function onMoviePressed(media: MediaProduct): void { }

  return (
    <div className="fill-window" style={styles.container}>
      <div
        style={{ display: "flex", flexDirection: "column", alignItems: "left" }}
      >
        <button
          style={{
            border: 0,
            backgroundColor: "transparent",
            display: "flex",
            alignItems: "flex-start",
            outline: "None",
          }}
          onClick={() => {
            history.replace("/app");
          }}
        >
          <p
            style={{
              color: "white",
              textDecoration: "underline",
              alignSelf: "left,",
            }}
          >
            {
              channelLoading ? (
                <Spinner animation="border" variant="danger" />
              ) : (
                  "<<" + currentChannel?.name
                )
            }
          </p>
        </button>
        <div
          style={{ display: "flex", flexDirection: "row", alignItems: "left", marginBottom: 12 }}
        >
          {
            mediasLoading ? (
              <Spinner animation="border" variant="danger" />
            ) : (
                currentChannel?.medias.length == 0 ? (
                  <div style={{ color: 'red', fontSize: 24 }}>No media found!</div>
                ) : (
                    currentChannel?.medias.map((media) => (

                      <Media media={media} />
                      // <button style={styles.button} onClick={() => onMoviePressed(media)}>
                      // <img style={{ width: 128, height: 128 }} src={media.thumbnail_url} />
                      // </button>
                    ))
                  )
              )
          }
        </div>
        <button
          style={{
            border: 0,
            backgroundColor: "transparent",
            display: "flex",
            alignItems: "flex-start",
            outline: "none",
          }}
          onClick={() =>
            history.replace(`/channel/${currentChannel?._id}/suggestions`)
          }
        >
          <p style={{ color: "white", textDecoration: "underline" }}>
            {"Suggestions for " + currentChannel?.name}
          </p>
        </button>
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
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  continueWatch: {
    display: "flex",
    height: 180,
  },
};

export default ChannelPage;
