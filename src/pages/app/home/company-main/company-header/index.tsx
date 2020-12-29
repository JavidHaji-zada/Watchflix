import React from "react";
import { Button, ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { CompanyMainState } from "../index";
import { APP_STYLES } from "../../../../../shared/styles";
import { Cache } from "../../../../../shared/libs/cache";
import { useHistory } from "react-router-dom";

interface CompanyHeaderProps {
  changeState: (state: CompanyMainState) => void;
}

function CompanyHeader(props: CompanyHeaderProps): JSX.Element {
  const history = useHistory()

  const { changeState } = props;

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
        <button
          style={{ backgroundColor: 'transparent', borderWidth: 0, outline: 'none' }}
          onClick={() => {
            changeState("default");
          }}>
          <h1
            style={{
              ...APP_STYLES.headerStyle,
              fontWeight: "bold",
              height: 40,
            }}
          >
            Watchflix
        </h1>
        </button>

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
              changeState("profile");
            }}
          >
            Profile
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              Cache.logoutUser()
              history.replace('/app')
            }}
          >
            Log out
          </Dropdown.Item>
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

export default CompanyHeader;
