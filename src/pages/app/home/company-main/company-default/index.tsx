import React, { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Modal } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { Cache } from "../../../../../shared/libs/cache";
import { MediaProduct } from "../../../../../shared/models/media-product";
import { CompanyMainState, MediaTypeState } from "../index";

function onMoviePressed(media: MediaProduct): void { }
interface DefaultProps {
  changeState: (state: CompanyMainState) => void;
  changeMedia: (state: MediaTypeState) => void;
}

function Default(props: DefaultProps): JSX.Element {
  const { changeState, changeMedia } = props;


  const [products, setProducts] = useState<MediaProduct[]>([]);

  const [mediaType, setMediaType] = useState("empty");
  const handleMovie = () => setMediaType("movie");
  const handleSerie = () => setMediaType("series");
  const [search, setSearch] = useState('')

  const [enableButton, setUpload] = useState(true);
  const handleUpload = () => setUpload(false);
  const handleDisable = () => setUpload(true);

  const [showDialog, setShowDialog] = useState(false);
  const handleClose = () => setShowDialog(false);
  const handleShow = () => setShowDialog(true);

  useEffect(() => {
    const options: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: Cache.getCurrentUser()?.username })
    }
    fetch(`http://localhost:5000/medias`, options)
      .then(res => {
        res.json().then(result => {
          console.log('result ', result)
          if (result.failed) {
          } else if (result.success) {
            let medias = result.data.map((media: any) => new MediaProduct(media))
            setProducts(medias)
          }
        })
      })
  }, []);
  return (
    <div style={{ ...styles.big_container, flexDirection: "column" }}>
      <div style={{ ...styles.container, flexDirection: "row" }}>
        <Button variant="danger" onClick={handleShow}>
          Publish New Media
        </Button>

        <Modal
          className="modal-dialog modal-sm"
          show={showDialog}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >

          <Modal.Body
            style={{
              backgroundColor: "pink",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p style={{ fontSize: 20, fontWeight: "bold" }}>Choose type of the media </p>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="exampleRadios"
                id="exampleRadios1"
                value="option1"
                onClick={() => { handleUpload(); changeMedia("series"); }}
              ></input>
              <label className="form-check-label" htmlFor="exampleRadios1">
                Series
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="exampleRadios"
                id="exampleRadios2"
                value="option2"
                onClick={() => { handleUpload(); changeMedia("movie"); }}
              ></input>
              <label className="form-check-label" htmlFor="exampleRadios2">
                Movie
              </label>
            </div>
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: "pink" }}>
            <Button
              variant="secondary"
              onClick={() => {
                handleClose();
                handleDisable();
              }}
            >
              Close
            </Button>
            <Button variant="danger" disabled={enableButton} onClick={() => { changeState("upload"); }} >
              Understood
            </Button>
          </Modal.Footer>
        </Modal>
        <Form.Row>
          <Form.Group as={Col}>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                placeholder="Search here.."
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                onSubmit={() => {
                  //TODO submit
                }}
              />
            </InputGroup>
          </Form.Group>
        </Form.Row>
      </div>
      <h2 style={{ fontSize: 24, color: "white", marginTop: 36 }}>
        Last uploaded media products
      </h2>
      <div>
        {products.map((media) => (
          <button
            style={styles.movie_button}
            onClick={() => onMoviePressed(media)}
          >
            <img style={styles.thumbnailStyle} src={media.thumbnail_url} />
            <p style={{ color: 'white' }}>{media.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: 2,
    paddingRight: 2,
    paddingTop: 2,
    width: "100%",
  },
  big_container: {
    flex: 1,
    display: "flex",
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8,
    width: "100%",
  },
  button: {
    backgroundColor: "red",
    color: "white",
    borderWidth: 3,
    borderColor: "black",
    fontStyle: "bold",
  },
  movie_button: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  thumbnailStyle: {
    width: 128,
    height: 128,
  },
};

export default Default;
