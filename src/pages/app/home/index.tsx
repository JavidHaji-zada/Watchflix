import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import Main from "./main";
import MainCompany from "./company-main";
import "./home.css";
import { CompanyUser, User } from "../../../shared/models/user";
import { Cache } from "../../../shared/libs/cache";

function Home(): JSX.Element {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState<User | CompanyUser>();

  function onLoginClicked() {
    history.push("/login");
  }

  function onRegisterClicked() {
    history.push("/register");
  }

  function isUserLoggedIn(): boolean {
    console.log('getting user ')
    let currentUser = Cache.getCurrentUser()
    return (!!currentUser && currentUser != null);
  }

  function isCompanyUser(): boolean {
    let currentUser = Cache.getCurrentUser()
    return currentUser?.type === 'company';
  }

  return (
    <div className="fill-window" style={styles.container}>
      {
        isUserLoggedIn() ? (
          isCompanyUser() ?
            <MainCompany /> :
            <Main />
        ) : (
            <div className="container-fluid homepage-bgimage">
              <Button
                onClick={onLoginClicked}
                style={{ position: "absolute", top: 10, right: 10 }}
                variant="danger"
              >
                Login
          </Button>
              <div style={styles.headerContainer}>
                <h1 style={{ ...styles.headerContainer, fontWeight: "bold" }}>Watchflix</h1>
              </div>
              <div style={styles.sloganContainer}>
                <h2 style={{ ...styles.sloganContainer, fontWeight: "bold" }}>Watchflix and Chill</h2>
              </div>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button onClick={onRegisterClicked} variant="danger">
                  Register Now!
            </Button>
              </div>
            </div>
          )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    backgroundImage: 'url(${background_photo})',
  },
  headerContainer: {
    width: "100%",
    marginTop: "2%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "red",
  },
  header: {
    fontSize: 32,
    color: "red",
  },
  sloganContainer: {
    width: "100%",
    marginTop: "0.5%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "red",
  },
  slogan: {
    fontSize: 32,
    color: "red",
  },
};

export default Home;
