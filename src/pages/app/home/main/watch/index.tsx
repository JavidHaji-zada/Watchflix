import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { MediaProduct } from "../../../../../shared/models/media-product";
import { WatchStatus } from "../../../../../shared/models/watch";
import { Comment } from "../../../../../shared/models/comment";
import { APP_COLORS } from "../../../../../shared/colors";
import { useHistory } from "react-router-dom";
import { Button, Form, Dropdown, DropdownButton, ProgressBar } from "react-bootstrap";
import { finished } from "stream";
import { Cache } from "../../../../../shared/libs/cache";

function Watch(props: any): JSX.Element {
  const [movie, setMovie] = useState<MediaProduct>();
  const [watchStatus, setWatchStatus] = useState<WatchStatus>();
  const [message, setMessage] = useState("");
  const history = useHistory();

  useEffect(() => {
    const options: RequestInit = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    if (props.match.params.id) {
      fetch(
        `http://localhost:5000/media/${props.match.params.id}`,
        options
      ).then((res) => {
        res.json().then((result) => {
          if (result.success) {
            let product = result.data;
            console.log('product ', product);
            let movie = new MediaProduct(product);
            console.log(movie);
            setMovie(movie);
          }
        });
      });
      fetch(
        `http://localhost:5000/watch/${Cache.getCurrentUser().username}/${props.match.params.id}`,
        options
      ).then((res) => {
        res.json().then((result) => {
          if (result.success) {
            console.log('result data ', result.data)
            if (result.data) {
              console.log('setting to false')
              setWatchStatus(new WatchStatus(result.data))
              if (result.data.watch_count >= 3) {
                setMessage("You have finished watching")
              } else {
                setMessage("Watching in progress")
              }
            }
          }
        });
      })
    }
  }, []);
  function renderInner(): JSX.Element {

    return (
      <div style={{ flex: 1, height: '100%', padding: 40, backgroundColor: '#333333' }}>
        <h1 style={{ padding: 40, color: 'red' }}>
          You are Watching {movie?.name}
        </h1>
        <ProgressBar now={watchStatus?.watch_count} max={3} />
        <h1 style={{ margin: 40, color: 'white' }}>
          {message}
        </h1>
      </div>
    );
  }
  return <div>{renderInner()}</div>;
}

const styles = {
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    height: "100%",
    overflow: "auto",
    backgroundColor: "#DDDDDD",
    paddingBottom: 20,
  },
  header: {
    color: APP_COLORS.red,
    marginTop: "5%",
  },
  innerContainer: {
    display: "flex",
    flex: 1,
    width: "90%",
    marginHorizontal: "5%",
    backgroundColor: "#E0CCCC",
    borderWidth: 4,
    borderColor: "#EA9999",
    borderStyle: "solid",
    alignItems: "center",
    paddingTop: "5%",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  blackText: {
    color: APP_COLORS.darkGray,
  },
  contentContainer: {
    display: "flex",
  },
  nextButton: {
    width: "25%",
    minWidth: 240,
    margin: 20,
  },
};

export default Watch;
