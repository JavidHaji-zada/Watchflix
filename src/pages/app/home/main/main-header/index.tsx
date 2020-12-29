import React from "react";
import { Button, ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { MainState } from "../index";
import { APP_STYLES } from "../../../../../shared/styles";
import { useHistory } from "react-router-dom";
import { Cache } from "../../../../../shared/libs/cache";

interface MainHeaderProps {
  changeState: (state: MainState) => void;
}

function MainHeader(props: MainHeaderProps): JSX.Element {
  const { changeState } = props;
  const history = useHistory()
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        <button style={{ outline: 'none', backgroundColor: 'transparent', borderWidth: 0 }}>
          <h1
            style={{
              ...APP_STYLES.headerStyle,
              fontWeight: "bold",
              height: 40,
            }}
            onClick={() => {
              changeState("default");
            }}
          >
            Watchflix
        </h1>
        </button>
        <Button
          style={styles.button}
          onClick={() => {
            changeState("series");
          }}
        >
          <u>Series</u>
        </Button>
        <Button
          style={styles.button}
          onClick={() => {
            changeState("movies");
          }}
        >
          <u>Movies</u>
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: 40,
        }}
      >
        <DropdownButton
          variant="secondary"
          className=".transparent-button"
          style={styles.nameButton}
          id="dropdown-basic-button"
          title={Cache.getCurrentUser()?.username} /** TODO: change into user.fullname */
        >
          <Dropdown.Item
            onClick={() => {
              changeState("friends");
            }}
          >
            My friends
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              changeState("groups");
            }}
          >
            Join Group
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              changeState("profile");
            }}
          >
            Profile
          </Dropdown.Item>
          <Dropdown.Item onClick={() => {
            localStorage.removeItem('currentUser')
            history.replace('/app')
          }}>Log out</Dropdown.Item>
        </DropdownButton>
      </div>
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
  },
};

export default MainHeader;
