import React, { HTMLAttributes, useState } from "react";
import { Button, ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";

import { APP_STYLES } from "../../../../shared/styles";
import MainHeader from "./main-header";
import Friends from "./friends-page";
import Channels from "./channels";
import Profile from "./profile";
import Movie from "./movie-page";
import Series from "./series-page";

export type MainState = "default" | "series" | "movies" | "friends" | "groups" | "profile";

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
        <div style={{ color: "white" }}><Series/></div>
      )}
      {state == "movies" && (
        <div style={{ color: "white" }}><Movie/></div>
      )}
      {state == "groups" && (
        <div style={{ color: "white" }}>I am group case</div>
      )}
      {
        state == 'profile' && (
          <div style={styles.container}>
            <Profile />
          </div>
        )
      }
    </div>
  );
}

const styles = {
  container: {
    flex: 1,
    display: "flex",
    backgroundColor: "#333333",
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 24,
  },
};

export default Main;
