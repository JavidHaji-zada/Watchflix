import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";

import NumericInput from "react-numeric-input";
function UploadEpisode(): JSX.Element {
  return (
    <div style={{ flex: 1,  flexDirection: "column" }}>
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
              className="col-sm-10"
              type="name"
              //onChange={(event) => setName(event.target.value)}
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
              className="col-sm-10"
              type="number"

              //onChange={(event) => setName(event.target.value)}
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
              className="col-sm-10"
              type="number"

              //onChange={(event) => setName(event.target.value)}
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
            //onChange={(event) => setProduct(event.target.value)}
            onClick={() => {
              //handleButton();
            }}
          ></input>
          <label className="custom-file-label" htmlFor="inputGroupFile01">
            Choose file
          </label>
        </div>
      </Form>
      <div style={{ flex: 1, flexDirection: "row" }}>
        <Button
          variant="danger"
          type="next"
          style={{ display: "flex", alignSelf: "flex-end" }}
          //disabled={enableButton}
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
