import React from "react";
import { useEffect, useRef, useState } from "react";
import { MediaProduct } from "../../../../../shared/models/media-product";
import { Comment } from "../../../../../shared/models/comment";
import { APP_COLORS } from "../../../../../shared/colors";
import { useHistory } from "react-router-dom";
import { Button, Form, Dropdown, DropdownButton, Modal } from "react-bootstrap";
import { WatchStatus } from "../../../../../shared/models/watch";
import { Cache } from "../../../../../shared/libs/cache";
import { User } from "../../../../../shared/models/user";

function MovieDetails(props: any): JSX.Element {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [movie, setMovie] = useState<MediaProduct>();
  const [comment_content, setContent] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentError, setCommentError] = useState('');
  const [updateScreen, setUpdateScreen] = useState(0)
  const [found, setFound] = useState<boolean>(true);
  const [watchStatus, setWatchStatus] = useState<WatchStatus>();
  const [firstWatch, setFirstWatch] = useState(true)
  let firstWatchRef = useRef<boolean>(firstWatch);
  const [replyTo, setReplyTo] = useState('');
  const [replyToUser, setReplyToUser] = useState('');
  const [replyContent, setReplyContent] = useState('');

  const history = useHistory();
  useEffect(() => {
    if (Cache.getCurrentUser()) {
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
            if (result.failed) {
              if (result.code == 403) {
                setFound(false)
              }
            } else if (result.success) {
              let product = result.data;
              console.log(product);
              let movie = new MediaProduct(product);
              console.log(movie);
              setMovie(movie);
            }
          });
        });
      }
      fetch(
        `http://localhost:5000/comments/${props.match.params.id}`,
        options
      ).then((res) => {
        res.json().then((result) => {
          console.log('comment result ', result)
          if (result.failed) {
            console.log('failed to comment')
          } else if (result.success) {
            let comments = result.data.map(
              (comment: any) => new Comment(comment)
            );
            console.log('set comments ', comments)
            setComments(comments);
          }
        });
      });

      fetch(
        `http://localhost:5000/watch/${Cache.getCurrentUser()?.username}/${props.match.params.id}`,
        options
      ).then((res) => {
        res.json().then((result) => {
          if (result.failed) {
          } else if (result.success) {
            console.log('result data ', result.data)
            if (result.data) {
              console.log('setting to false')
              setFirstWatch(false)
              setWatchStatus(new WatchStatus(result.data))
            }
          }
        });
      });
    }
  }, []);

  function likeMovie() {
    //like movie
  }
  function dislikeMovie() {
    //dislike movie
  }
  function watch() {
    //watch movie
    const options: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: Cache.getCurrentUser()?.username,
        m_id: movie?._id,
        watch_date: User.formatDateHours(new Date()),
        watch_count: watchStatus?.watch_count ? watchStatus.watch_count + 1 : 1
      }),
    };
    console.log(firstWatch)
    if (firstWatch == true) {
      console.log('first')
      fetch("http://localhost:5000/new_watch", options)
        .then(res => {
          res.json().then(result => {
            if (result.success)
              history.push(`/watch/${movie?._id}`);
          })
        })
    } else {
      fetch("http://localhost:5000/update_watch", options)
        .then(res => {
          res.json().then(result => {
            console.log('update res ', result)
            if (result.success)
              history.push(`/watch/${movie?._id}`);
          })
        })
    }
  }

  function replyMovie() {
    let comment: any = {};
    comment.m_id = movie?._id || ''
    comment.c_content = "@" + replyToUser + " " + replyContent
    comment.comment_date = User.formatDate(new Date())
    comment.username = Cache.getCurrentUser()?.username
    comment.replied_to = replyTo

    let commentObj = new Comment();
    commentObj.m_id = movie?._id || ''
    commentObj.c_content = "@" + replyToUser + " " + replyContent
    commentObj.comment_date = new Date()
    commentObj.username = Cache.getCurrentUser()?.username || ''
    comment.replied_to = replyTo

    setReplyContent('')
    setReplyTo('')
    setReplyToUser('')

    const options: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment)
    };

    setContent('')
    fetch('http://localhost:5000/comment', options)
      .then(res => {
        res.json().then(result => {
          console.log('comment result ', result)
          if (result.success) {
            let curComments = comments
            commentObj.comment_id = result.data
            curComments.push(commentObj)
            setComments(curComments)
            let update = updateScreen
            update += 1
            setUpdateScreen(update)
          } else {
            setCommentError(result.failed)
          }
        })
      })
  }

  function commentMovie() {
    //Comment
    let comment: any = {};
    comment.m_id = movie?._id || ''
    comment.c_content = comment_content
    comment.comment_date = User.formatDate(new Date())
    comment.username = Cache.getCurrentUser()?.username

    let commentObj = new Comment();
    commentObj.m_id = movie?._id || ''
    commentObj.c_content = comment_content
    commentObj.comment_date = new Date()
    commentObj.username = Cache.getCurrentUser()?.username || ''
    const options: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment)
    };

    setContent('')
    fetch('http://localhost:5000/comment', options)
      .then(res => {
        res.json().then(result => {
          console.log('comment result ', result)
          if (result.success) {
            let curComments = comments
            commentObj.comment_id = result.data
            curComments.push(commentObj)
            setComments(curComments)
            let update = updateScreen
            update += 1
            setUpdateScreen(update)
            setReplyContent('')
            setReplyTo('')
            setReplyToUser('')
          } else {
            setCommentError(result.failed)
          }
        })
      })
  }
  function createGroup() {
    //create Group
  }
  function renderInner(): JSX.Element {
    if (found) {
      return (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#333333",
          }}
        >
          <button style={{ backgroundColor: 'transparent', width: 100, borderWidth: 0, color: 'white' }} onClick={() => history.replace('/app')}>
            Go back
          </button>
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
            <p style={{ marginLeft: 20, color: "white" }}>
              {movie?.description}
            </p>
            <p style={{ marginLeft: 20, color: "white" }}>
              Producer: {movie?.publisher}
            </p>
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
                  handleShow();
                }}
              >
                Create Group
              </Dropdown.Item>
            </DropdownButton>
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Body
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <p style={{ fontSize: 24 }}>Here is id for your group:</p>
                <p style={{ fontSize: 24, fontWeight: "bold" }}> 000000 </p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="danger">Got it!</Button>
              </Modal.Footer>
            </Modal>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Form.Group controlId="formBasicEmail" style={{ margin: 20 }}>
              <Form.Label></Form.Label>
              <Form.Control
                onChange={(event) => setContent(event.target.value)}
                value={comment_content}
                type="text"
                placeholder="comment"
              />
              {
                commentError && (
                  <p style={{ color: 'red' }}>{commentError}</p>
                )
              }
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
            {comments.map((comment) => {
              console.log('rendering comment ', comment)
              return (
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
                    marginLeft: comment.replied_to ? 25 : 20
                  }}
                >
                  <p style={{ color: "blue" }}>{comment.username + " " + User.formatDate(comment.comment_date)}</p>
                  <p style={{ color: "white" }}>{comment.c_content}</p>
                  {
                    replyTo == comment.comment_id && comment.comment_id ? (
                      <div>
                        <input onChange={(e) => setReplyContent(e.target.value)} value={replyContent} placeholder='Write reply' />
                        <Button onClick={() => replyMovie()} variant='primary'>Submit Reply</Button>
                      </div>
                    ) : (
                        <Button onClick={() => {
                          setReplyToUser(comment.username)
                          setReplyTo(comment.comment_id)
                        }} variant='primary'>Reply</Button>
                      )
                  }
                </div>
              )
            }
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1 style={{ margin: 40 }}>FILM NOT FOUND</h1>
        </div>
      );
    }
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
    margin: 20,
  },
};

export default MovieDetails;
