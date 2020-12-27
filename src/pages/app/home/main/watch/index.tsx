import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { MediaProduct } from "../../../../../shared/models/media-product";
import { WatchStatus } from "../../../../../shared/models/watch";
import { Comment } from "../../../../../shared/models/comment";
import { APP_COLORS } from "../../../../../shared/colors";
import { useHistory } from "react-router-dom";
import { Button, Form,  Dropdown, DropdownButton, ProgressBar } from "react-bootstrap";
import { finished } from "stream";

function Watch(props: any): JSX.Element {
  const [movie, setMovie] = useState<MediaProduct>();
  const [status, setStatus] = useState<WatchStatus>();
  const [message, setMessage] = useState("");
  const history = useHistory();
  useEffect(() => {
    let movie = new MediaProduct({
        _id: props.match.params.id,
        score: 3,
        release_date: new Date(),
        name: "Panda 2",
        thumbnail_url: "fsnsjhdjdjdhddjh",
        description:
          "Po and his friends fight to stop a peacock villain from conquering China with a deadly new weapon, but first the Dragon Warrior must come to terms with his past.",
      });
    let status = new WatchStatus({
        username: "alibaba",
        product_id: props.match.params.id,
        w_date: new Date(),
        watch_count: 4,
    })
      console.log(movie._id);
      setMovie(movie);
      setStatus(status);
      setMessage("basliyibsan qurtar blet")
      if(status && status.watch_count >= 3){
        setMessage("davay ayri seye bax")
        }
  }, []);
  function renderInner(): JSX.Element {

    return (
      <div style={{margin:40}}>
          <h1 style={{margin:40}}>
              You are Watching {movie?.name}
          </h1>
          <ProgressBar now={status?.watch_count} max={3}/>
          <h1 style={{margin:40}}>
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
