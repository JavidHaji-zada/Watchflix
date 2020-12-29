import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";

import NumericInput from "react-numeric-input";
import { CompanyMainState } from "../..";
import { Episode } from "../../../../../../shared/models/episode";

interface UploadEpisodeProps {
  mediaProduct: string;
  changeState: (state: CompanyMainState) => void;
}

function UploadEpisode(props: UploadEpisodeProps): JSX.Element {
  const { mediaProduct, changeState } = props;
  const [episode_name, setName] = useState("");
  const [s_number, setSeason] = useState("1");
  const [e_number, setEpisode] = useState("1");
  const [file, setFile] = useState("");

  const handleForm = () => {
    setName("");
    setSeason("1");
    setEpisode("1");
    setFile("");
  };
  const [uploaded, setUploaded] = useState<Episode[]>([]);
  const handleUpload = (Episode: any) => {
    setUploaded([...uploaded, Episode]);
  };

  useEffect(() => {
    setUploaded(uploaded);
  }, []);
  return (
    <div style={{ flex: 1, flexDirection: "column" }}>
      <Form
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 40,
          justifyContent: "space-between",
          flex: 1,
          maxWidth: "70%",
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
            Episode name:
          </Form.Label>
          <Col sm="8">
            <Form.Control
              value={episode_name}
              className="col-sm-10"
              type="name"
              onChange={(event) => setName(event.target.value)}
              //onClick = {() => {handleButton();}}
            />
          </Col>
        </Form.Group>
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
            Season number:
          </Form.Label>
          <Col sm="8">
            <Form.Control
              value={s_number}
              className="col-sm-10"
              type="number"
              onChange={(event) => setSeason(event.target.value)}
              //onClick = {() => {handleButton();}}
            />
          </Col>
        </Form.Group>
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
            Episode number:
          </Form.Label>
          <Col sm="8">
            <Form.Control
              value={e_number}
              className="col-sm-10"
              type="number"
              onChange={(event) => setEpisode(event.target.value)}
              //onClick = {() => {handleButton();}}
            />
          </Col>
        </Form.Group>
        <p style={{ fontSize: 20 }}>Upload your product</p>
        <div className="custom-file">
          <input
            type="file"
            className="custom-file-input"
            id="inputGroupFile01"
            value={file}
            onChange={(event) => setFile(event.target.value)}
            onClick={() => {
              //handleButton();
            }}
          ></input>
          <label className="custom-file-label" htmlFor="inputGroupFile01">
            Choose file
          </label>
        </div>
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "row",
            alignSelf: "flex-end",
            maxWidth: "40%",
            justifyContent: "spaceBetween"
          }}
        >
          <Button
            variant="danger"
            type="submit"
            style={{ display: "flex", alignSelf: "flex-end" }}
            onClick={() => {
              window.location.reload();
              handleForm();
              let episode = new Episode({ _id: 'xxxx', name: {episode_name}, season_number: {s_number}, episode_number: {e_number}, thumbnail_url: {file} })
              handleUpload(episode);
            }}
          >
            Next
          </Button>
          <Button
            variant="danger"
            type="submit"
            style={{ display: "flex", alignSelf: "flex-end" }}
            //disabled={enableButton}
          >
            Finish
          </Button>
        </div>
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

export default UploadEpisode;
