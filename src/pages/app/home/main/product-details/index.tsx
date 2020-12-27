import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { MediaProduct } from "../../../../../shared/models/media-product";
import { Comment } from "../../../../../shared/models/comment";
import { APP_COLORS } from "../../../../../shared/colors";
import { useHistory } from "react-router-dom";
import { Button, Form,  Dropdown, DropdownButton } from "react-bootstrap";

function MovieDetails(props: any): JSX.Element {
  const [movie, setMovie] = useState<MediaProduct>();
  const [comment_content, setContent] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
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
    setMovie(movie);
    console.log(movie);
    comments.push(
      new Comment({
        username: "ali balibo",
        mid: "gggggggg",
        c_id: "aaa",
        r_id: "dhdjdj",
        date: new Date(),
        content: "meslehetdi doylu",
      })
    );
    comments.push(
      new Comment({
        username: "ali balibo",
        mid: "gggggggg",
        c_id: "aaa",
        r_id: "dhdjdj",
        date: new Date(),
        content: "meslehetdi doylu",
      })
    );
    comments.push(
      new Comment({
        username: "ali balibo",
        mid: "gggggggg",
        c_id: "aaa",
        r_id: "dhdjdj",
        date: new Date(),
        content: "meslehetdi doylu",
      })
    );
    comments.push(
      new Comment({
        username: "ali balibo",
        mid: "gggggggg",
        c_id: "aaa",
        r_id: "dhdjdj",
        date: new Date(),
        content: "meslehetdi doylu",
      })
    );
    comments.push(
      new Comment({
        username: "ali balibo",
        mid: "gggggggg",
        c_id: "aaa",
        r_id: "dhdjdj",
        date: new Date(),
        content: "meslehetdi doylu",
      })
    );
    comments.push(
      new Comment({
        username: "ali balibo",
        mid: "gggggggg",
        c_id: "aaa",
        r_id: "dhdjdj",
        date: new Date(),
        content: "meslehetdi doylu",
      })
    );
    comments.push(
      new Comment({
        username: "ali balibo",
        mid: "gggggggg",
        c_id: "aaa",
        r_id: "dhdjdj",
        date: new Date(),
        content: "meslehetdi doylu",
      })
    );
    comments.push(
      new Comment({
        username: "ali balibo",
        mid: "gggggggg",
        c_id: "aaa",
        r_id: "dhdjdj",
        date: new Date(),
        content: "meslehetdi doylu",
      })
    );
  }, []);
  function likeMovie() {
    //like movie
  }
  function dislikeMovie() {
    //dislike movie
  }
  function watch() {
    //watch movie
    history.push(`/watch/${movie?._id}`);
  }
  function commentMovie() {
    //Comment
  }
  function createGroup()
  {
    //create Group
  }
  function renderInner(): JSX.Element {
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#333333",
        }}
      >
        <img
          style={{ margin: 20, flex: 1 }}
          src="https://i.pinimg.com/564x/9c/4e/41/9c4e413ee194ff1ffc1d7bf3dbb3f3d2.jpg"
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h1 style={{ textAlign: "start", color: "white", margin: 20 }}>
              {movie?.name}
            </h1>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                style={styles.nextButton}
                onClick={likeMovie}
                variant="danger"
              >
                like
              </Button>
              <Button
                style={styles.nextButton}
                onClick={dislikeMovie}
                variant="danger"
              >
                dislike
              </Button>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h1 style={{ color: "white", margin: 20 }}>
              Score: {movie?.score}
            </h1>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <p style={{ marginLeft: 20, color: "white" }}>{movie?.description}</p>
          <p style={{ marginLeft: 20, color: "white" }}>Producer</p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
        <DropdownButton
          variant="danger"
          className=".transparent-button"
          style={styles.nameButton}
          id="dropdown-basic-button"
          title="Start Watching" /** TODO: change into user.fullname */
        >
          <Dropdown.Item
            onClick={() => {
              watch();
            }}
          >
            Start
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              createGroup();
            }}
          >
            Create Group
          </Dropdown.Item>
        </DropdownButton>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Form.Group controlId="formBasicEmail" style={{ margin: 20 }}>
            <Form.Label></Form.Label>
            <Form.Control
              onChange={(event) => setContent(event.target.value)}
              type="text"
              placeholder="comment"
            />
          </Form.Group>
          <Button
            style={styles.nextButton}
            onClick={commentMovie}
            variant="danger"
          >
            post comment
          </Button>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h4 style={{ color: "white", margin: 20 }}>Comments</h4>
          {comments.map((comment) => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                margin: 20,
                backgroundColor: "gray",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <p style={{ color: "blue" }}>{comment.username}</p>
              <p style={{ color: "white" }}>{comment.c_content}</p>
            </div>
          ))}
        </div>
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
  button: {
    alignSelf: "flex-start",
    backgroundColor: "transparent",
    borderWidth: 0,
    textDecoration: "underline",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  nameButton: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    margin:20
  },
};

export default MovieDetails;
