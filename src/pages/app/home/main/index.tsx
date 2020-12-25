import React, { HTMLAttributes, useState } from "react";
import { Button, ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";

import { APP_STYLES } from "../../../../shared/styles";
import MainHeader from "./main-header";
import Friends from "./friends-page";
import Channels from "./channels";

export type MainState = "default" | "series" | "movies" | "friends" | "groups";

function Main(): JSX.Element {
  const [state, setState] = useState<MainState>("default");

  return (
    <div style={{ ...styles.container, flexDirection: "column" }}>
      <MainHeader changeState={setState} />
      {state == "default" && (
        <div style={styles.container}>
          <Channels />
        </div>
      )}
      {state == "friends" && (
        <div style={styles.container}>
          <Friends />
        </div>)}
      {state == "series" && (
        <div style={{ color: "white" }}>I am series case</div>
      )}
      {state == "movies" && (
        <div style={{ color: "white" }}>I am movies case</div>
      )}
      {state == "groups" && (
        <div style={{ color: "white" }}>I am group case</div>
      )}
    </div>
  );
}

const styles = {
  container: {
    flex: 1,
    display: "flex",
    backgroundColor: "#141414",
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 24,
  },
};

export default Main;
