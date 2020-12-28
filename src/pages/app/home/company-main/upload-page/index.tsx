import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, FormControl, InputGroup } from "react-bootstrap";
import { EndOfLineState, isElementAccessExpression } from "typescript";

import { APP_COLORS } from "../../../../../shared/colors";
import { MediaService } from "../../../../../shared/libs/media-service";
import { Genre } from "../../../../../shared/models/genre";
interface MediaProps {
  mediaProduct: string;
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
function Upload(props: MediaProps): JSX.Element {
  const { mediaProduct } = props;
  const genres = MediaService.getGenres();

  const [genreStates, setGenreStates] = useState<GenreState[]>([]);
  const [updateScreen, setUpdateScreen] = useState(false);

  useEffect(() => {
    let genreStates = genres.map((genre) => ({ genre, checked: false }));
    setGenreStates(genreStates);
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
            <Form.Control className="col-sm-10" type="name" />
          </Col>
        </Form.Group>

        <Form.Group style={{ ...styles.formGroup, flexDirection: "row" }}>
          <Form.Label
            style={{ fontSize: 16, fontWeight: "bold" }}
          >
            {" "}
            Release date:{" "}
          </Form.Label>
          <Col sm="8">
            <Form.Control type="date" name="dob" placeholder="Date of Birth" />
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
                  console.log("genre states ", genreStates);
                  setGenreStates(genreStates);
                  setUpdateScreen(!updateScreen);
                }}
              />
            </Form.Group>
          ))}
        </div>
        <p>You cannot choose more than three genres</p>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button
          variant="danger"
          type="next"
          style={{ display: "flex", alignSelf: "flex-end" }}
        >
          Next
        </Button>
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
