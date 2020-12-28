import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { APP_COLORS } from "../../../shared/colors";
import { MediaService } from "../../../shared/libs/media-service";
import { Genre } from "../../../shared/models/genre";
import { CompanyUser, User, UserType } from "../../../shared/models/user";

import "./register.css";

type GenreState = {
  genre: Genre;
  checked: boolean;
};

function Register(): JSX.Element {
  const history = useHistory()

  const genres = MediaService.getGenres();

  const [currentStage, setCurrentStage] = useState(1);
  const [genreStates, setGenreStates] = useState<GenreState[]>([]);
  const [updateScreen, setUpdateScreen] = useState(false);

  const [userType, setUserType] = useState<UserType>("individual");

  const [name, setName] = useState("Javid");
  const [surname, setSurname] = useState("Haji-zada");
  const [username, setUsername] = useState("jahazious");
  const [password, setPassword] = useState("mypass");
  const [birthday, setBirthday] = useState<Date>(new Date());
  const [email, setEmail] = useState("cavid.hacizadee.99@gmail.com");

  const companyInputRef = useRef<HTMLInputElement>(null);
  const individualInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let genreStates = genres.map((genre) => ({ genre, checked: false }));
    setGenreStates(genreStates);
  }, []);

  function setChecked(option: UserType) {
    setUserType(option);
  }

  function renderInner(): JSX.Element {
    switch (currentStage) {
      case 1: {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h3 style={{ textAlign: "center", color: APP_COLORS.darkGray }}>
              Is this account for a company or individual purposes?:
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <input
                ref={companyInputRef}
                checked={userType == "company"}
                type="radio"
                name="user"
                value="Company"
                onClick={() => setChecked("company")}
              />
              <button
                style={{
                  marginLeft: 12,
                  border: 0,
                  backgroundColor: "transparent",
                }}
                onClick={() => setChecked("company")}
              >
                Company
              </button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <input
                checked={userType == "individual"}
                ref={individualInputRef}
                defaultChecked
                type="radio"
                name="user"
                value="Individual"
                onClick={() => setChecked("individual")}
              />
              <button
                style={{
                  marginLeft: 12,
                  border: 0,
                  backgroundColor: "transparent",
                }}
                onClick={() => setChecked("individual")}
              >
                Individual
              </button>
            </div>
          </div>
        );
      }
      case 2: {
        return (
          <div>
            {userType == "individual" ? (
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ marginRight: 20 }}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Enter Your Name:</Form.Label>
                    <Form.Control
                      onChange={(event) => setName(event.target.value)}
                      type="text"
                      placeholder="Name"
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Enter Your Surname</Form.Label>
                    <Form.Control
                      onChange={(event) => setSurname(event.target.value)}
                      type="text"
                      placeholder="Surname"
                    />
                  </Form.Group>
                  <Form.Group
                    controlId="formBasicCheckbox"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <Form.Label>Birthday</Form.Label>
                    <input
                      style={{
                        borderColor: APP_COLORS.inputBorderGray,
                        borderStyle: "solid",
                        borderWidth: 1,
                        borderRadius: 6,
                        padding: 6,
                        color: APP_COLORS.inputPlaceholder,
                      }}
                      type="date"
                      id="birthday"
                      name="birthday"
                      min="1900-01-01"
                      max="2007-01-01"
                      onChange={(event) =>
                        setBirthday(new Date(event.target.value))
                      }
                    />
                  </Form.Group>
                </div>
                <div style={{ marginLeft: 20 }}>
                  <Form.Group controlId="formBasicText">
                    <Form.Label>Create Your Username</Form.Label>
                    <Form.Control
                      onChange={(event) => setUsername(event.target.value)}
                      type="text"
                      placeholder="Username"
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Choose password</Form.Label>
                    <Form.Control
                      onChange={(event) => setPassword(event.target.value)}
                      type="password"
                      placeholder="Password"
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>E-mail Address</Form.Label>
                    <Form.Control
                      onChange={(event) => setEmail(event.target.value)}
                      type="email"
                      placeholder="E-mail"
                    />
                  </Form.Group>
                </div>
              </div>
            ) : (
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div style={{ marginRight: 20 }}>
                    <Form.Group controlId="formBasicText">
                      <Form.Label>Company Name:</Form.Label>
                      <Form.Control
                        onChange={(event) => setName(event.target.value)}
                        type="text"
                        placeholder="Company Name"
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>E-mail Address</Form.Label>
                      <Form.Control
                        onChange={(event) => setEmail(event.target.value)}
                        type="email"
                        placeholder="E-mail"
                      />
                    </Form.Group>
                  </div>
                  <div style={{ marginLeft: 20 }}>
                    <Form.Group controlId="formBasicText">
                      <Form.Label>Create Company Username</Form.Label>
                      <Form.Control
                        onChange={(event) => setUsername(event.target.value)}
                        type="text"
                        placeholder="Username"
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Choose password</Form.Label>
                      <Form.Control
                        onChange={(event) => setPassword(event.target.value)}
                        type="password"
                        placeholder="Password"
                      />
                      {/* <Form.Text className="text-danger">
                                                    We'll never share your email with anyone else.
                                                </Form.Text> */}
                    </Form.Group>
                  </div>
                </div>
              )}
          </div>
        );
      }
      case 3: {
        return (
          <div style={{ width: "60%", padding: 20 }}>
            <p>Choose your preferences</p>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {genreStates.map(({ genre, checked }, index) => (
                <Form.Group
                  style={{
                    flex: 1,
                    margin: 20,
                    maxWidth: "33%",
                    minWidth: "20%",
                  }}
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
          </div>
        );
      }
      default: {
        return <div />;
      }
    }
  }

  function finalizeRegistration(): void {
    if (userType == "individual") {
      // complete registration for individual
      let user = new User({ type: userType, username, email, birthday, fullname: name + " " + surname });
      console.log('creating individual user ', user)
      console.log('creating individual user ', JSON.stringify(user))
      const options: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...user, preffered_genres: genreStates.map(genreState => {
            if (genreState.checked)
              return genreState.genre
          }).filter(genre => genre),
          password,
          birthday: User.formatDate(birthday)
        })
      }
      fetch('http://localhost:5000/register', options)
        .then(res => {
          console.log('res ', res)
          localStorage.setItem('currentUser', username)
          history.replace('/app')
        })
        .then(contents => {
          console.log('contents ', contents)
        })
        .catch(err => {
          console.log('err ', err)
        })
    } else if (userType == "company") {
      // complete registration for company
      let companyUser = new User({ type: userType, username, email });

    }
  }

  function renderButton(): JSX.Element {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "10%",
          width: "100%",
        }}
      >
        {userType == "individual" ? (
          currentStage == 3 ? (
            <Button
              style={styles.nextButton}
              onClick={finalizeRegistration}
              variant="danger"
            >
              Register Me!
            </Button>
          ) : (
              <Button
                style={styles.nextButton}
                disabled={!(name && username && password && email && birthday && surname) && (currentStage == 2)}
                onClick={() => setCurrentStage(currentStage + 1)}
                variant="danger"
              >
                Next
              </Button>
            )
        ) : currentStage == 2 ? (
          <Button
            disabled={!(name && username && password && email) && (currentStage == 2)}
            style={styles.nextButton}
            onClick={finalizeRegistration}
            variant="danger"
          >
            Register Me!
          </Button>
        ) : (
              <Button
                style={styles.nextButton}
                onClick={() => setCurrentStage(currentStage + 1)}
                variant="danger"
              >
                Next
              </Button>
            )}
      </div>
    );
  }

  return (
    <div style={{ ...styles.container, ...{ flexDirection: "column" } }}>
      <h1 style={styles.header}>Watchflix</h1>
      <h3 style={{ textAlign: "center" }}>
        Just a few steps to enjoy movie night
      </h3>
      <div style={{ ...styles.innerContainer, ...{ flexDirection: "column" } }}>
        {renderInner()}
        {renderButton()}
      </div>
    </div>
  );
}

const styles = {
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    height: "100%",
    overflow: "auto",
    backgroundColor: "#DDDDDD",
    paddingBottom: 20,
  },
  header: {
    color: APP_COLORS.red,
    marginTop: "5%",
  },
  innerContainer: {
    display: "flex",
    flex: 1,
    width: "90%",
    marginHorizontal: "5%",
    backgroundColor: "#E0CCCC",
    borderWidth: 4,
    borderColor: "#EA9999",
    borderStyle: "solid",
    alignItems: "center",
    paddingTop: "5%",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  blackText: {
    color: APP_COLORS.darkGray,
  },
  contentContainer: {
    display: "flex",
  },
  nextButton: {
    width: "70%",
    minWidth: 240,
  },
};

export default Register;
