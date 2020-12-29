import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";

import { APP_COLORS } from "../../../../../shared/colors";
import { Cache } from "../../../../../shared/libs/cache";
import { User } from "../../../../../shared/models/user";
function Profile(): JSX.Element {
  let curUser = Cache.getCurrentUser()
  console.log("cur user ", curUser)
  let n, s = ""
  if (curUser instanceof User) {
    n = curUser.fullname.split(' ')[0]
    s = curUser.fullname.split(' ')[1]
  }
  console.log('n s', n, " ", s)
  const [name, setName] = useState(n);
  const [surname, setSurname] = useState(s);
  const [username, setUsername] = useState(curUser?.username);
  const [password, setPassword] = useState("");
  const [result, setResult] = useState('');

  function saveChanges() {
    const options: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        surname,
        username: Cache.getCurrentUser()?.username,
        password: password,
        type: "individual",
        new_username: username
      }),
    };
    fetch("http://localhost:5000/update_profile", options)
      .then(res => {
        res.json().then(result => {
          setResult(result.failed || result.success)
        })
      })
  }
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
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <div style={{ marginRight: 20 }}>
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
          variant="danger"
          onClick={saveChanges}
        >
          Save Changes
        </Button>
        <p>{result}</p>
      </div>
    </div>
  );
}

export default Profile;
