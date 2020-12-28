import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";

import { APP_COLORS } from "../../../../../shared/colors";
function Profile(): JSX.Element {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: 60 }}
      >
        <div style={{ marginRight: 20}}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label style={{ color: "white" }}>
              Change Your Name:
            </Form.Label>
            <Form.Control
              onChange={(event) => setName(event.target.value)}
              type="text"
              placeholder="Name"
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label style={{ color: "white" }}>
              Change Your Surname
            </Form.Label>
            <Form.Control
              onChange={(event) => setSurname(event.target.value)}
              type="text"
              placeholder="Surname"
            />
          </Form.Group>
        </div>
        <div style={{ marginLeft: 20 }}>
          <Form.Group controlId="formBasicText">
            <Form.Label style={{ color: "white" }}>
              Change Your Username
            </Form.Label>
            <Form.Control
              onChange={(event) => setUsername(event.target.value)}
              type="text"
              placeholder="Username"
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label style={{ color: "white" }}>
              Change your password
            </Form.Label>
            <Form.Control
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button
          variant = "danger"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}

export default Profile;
