import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, FormControl, InputGroup } from "react-bootstrap";
import { EndOfLineState, isElementAccessExpression } from "typescript";
import { CompanyMainState } from "..";

import { APP_COLORS } from "../../../../../shared/colors";
import { Cache } from "../../../../../shared/libs/cache";
import { MediaService } from "../../../../../shared/libs/media-service";
import { Genre } from "../../../../../shared/models/genre";
import { MediaProduct } from "../../../../../shared/models/media-product";
import { User } from "../../../../../shared/models/user";
import UploadEpisode from "./episode-upload";
interface UploadProps {
  mediaProduct: string;
  changeState: (state: CompanyMainState) => void;
}
function isMovie(mediatype: any): boolean {
  if (mediatype == "movie") {
    return true;
  } else {
    return false;
  }
}
type GenreState = {
  genre: Genre;
  checked: boolean;
};
function Upload(props: UploadProps): JSX.Element {

  const [name, setName] = useState("");
  const [date, setRelease] = useState(new Date());
  const [product, setProduct] = useState("");
  let count = 0;

  const [enableButton, setButton] = useState(true);
  const handleButton = () => setButton(
    name == "" || count == 0
  );

  const { mediaProduct, changeState } = props;

  const genres = MediaService.getGenres();
  const [uploaded, setUploaded] = useState<MediaProduct[]>([]);;
  const handleUpload = (MediaProduct: any) => { setUploaded([...uploaded, MediaProduct]) };

  const [genreStates, setGenreStates] = useState<GenreState[]>([]);
  const [updateScreen, setUpdateScreen] = useState(false);


  useEffect(() => {
    let genreStates = genres.map((genre) => ({ genre, checked: false }));
    setGenreStates(genreStates);
    setUploaded(uploaded);
  }, []);

  return (
    <div style={{ flex: 1 }}>
      <Form
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 40,
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <Form.Group
          style={{
            ...styles.formGroup,
            flexDirection: "row",
          }}
        >
          <Form.Label
            style={{
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {isMovie(mediaProduct) ? "Movie" : "Series"} name:{" "}
          </Form.Label>
          <Col sm="8">
            <Form.Control
              className="col-sm-10"
              type="name"
              onChange={(event) => setName(event.target.value)}
              onClick={() => { handleButton(); }}
            />
          </Col>
        </Form.Group>

        <Form.Group style={{ ...styles.formGroup, flexDirection: "row" }}>
          <Form.Label style={{ fontSize: 16, fontWeight: "bold" }}>
            {" "}
            Release date:{" "}
          </Form.Label>
          <Col sm="8">
            <Form.Control
              type="date"
              name="dob"
              placeholder="Date of Birth"
              onChange={(event) => setRelease(new Date(event.target.value))}
              onClick={() => { handleButton(); }}
            />
          </Col>
        </Form.Group>

        <p>Enter genres for your product:</p>
        <div style={{ display: "flex", flexWrap: "wrap", maxWidth: "80%" }}>
          {genreStates.map(({ genre, checked }, index) => (
            <Form.Group
              style={{ flex: 1, margin: 20, maxWidth: "33%", minWidth: "20%" }}
              controlId="formBasicCheckbox"
            >
              <Form.Check
                checked={checked}
                type="checkbox"
                label={genre.name}
                onClick={() => {

                  genreStates[index].checked = !genreStates[index].checked;
                  if (genreStates[index].checked) {
                    count++;
                  } else {
                    count--;
                  }
                  handleButton();
                  console.log("genre states ", genreStates);
                  setGenreStates(genreStates);
                  setUpdateScreen(!updateScreen);
                }}
              />
            </Form.Group>
          ))}
        </div>
        {isMovie(mediaProduct) ? (
          <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
            <div className="input-group mb-3" style={{ maxWidth: "40%" }}>
              <div className="input-group-prepend">
                <span className="input-group-text">Upload</span>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="inputGroupFile01"
                  onChange={(event) => setProduct(event.target.value)}
                  onClick={() => { handleButton(); }}
                ></input>
                <label className="custom-file-label" htmlFor="inputGroupFile01">
                  Choose file
                </label>
              </div>
            </div>
            <Button
              variant="danger"
              type="submit"
              style={{ display: "flex", alignSelf: "flex-end" }}
              disabled={enableButton}
              onClick={() => {
                const options: RequestInit = {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    release_date: User.formatDate(date),
                    name,
                    publisher: Cache.getCurrentUser()?.username,
                  }),
                };
                fetch("http://localhost:5000/upload", options)
                  .then(res => {
                    res.json().then(result => {
                      if (result.success) {
                        changeState('default')
                      }
                    })
                  })
              }}
            >
              Finish
            </Button>
          </div>
        ) : (
            <Button
              variant="danger"
              type="next"
              style={{ display: "flex", alignSelf: "flex-end" }}
              disabled={enableButton}
              onClick={() => { changeState("episodeUpload"); }}
            >
              Next
            </Button>
          )}
      </Form>

    </div>
  );
}

const styles = {
  formGroup: {
    display: "flex",
    justifyContent: "space-between",
    maxWidth: "50%",
  },
};
export default Upload;
