import { wrap } from "module";
import React, { HTMLAttributes, useEffect, useState } from "react";
import { Button, ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { FaUserAlt, FaUserPlus, FaUserMinus } from 'react-icons/fa';
import { BsChevronDoubleRight } from 'react-icons/bs';
import { User, UserType } from "../../../../../shared/models/user";
import { Cache } from "../../../../../shared/libs/cache";

//import { APP_STYLES } from "../../../../shared/styles";
function Friends(): JSX.Element {
  const [friends, setFriends] = useState<User[]>([]);
  const [newFriend, setNewFriend] = useState('');
  const [requestResult, setRequestResult] = useState('');
  const [requestError, setRequestError] = useState('');
  const [requestLoading, setRequestLoading] = useState('');
  const [receivedRequests, setReceived] = useState([]);
  useEffect(() => {
    const options: RequestInit = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`http://localhost:5000/received_requests/${Cache.getCurrentUser().username}`, options)
      .then(res => {
        res.json().then(result => {
          setReceived(result.data)
        })
      })
  }, []);

  function sendFriendRequest() {
    let request = {
      from: Cache.getCurrentUser().username,
      to: newFriend
    }
    const options: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request)
    };
    setNewFriend('')
    fetch("http://localhost:5000/send_request", options)
      .then(res => {
        res.json().then(result => {
          console.log('res ', result)
          if (result.failed) {
            setRequestError(result.failed)
          } else {
            setRequestResult(result.success)
          }
        })
      })
  }

  function acceptRequest(username: string) {
    let request = {
      username1: username,
      username2: Cache.getCurrentUser().username,
    }
    const options: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request)
    };
    setNewFriend('')
    fetch("http://localhost:5000/accept_request", options)
      .then(res => {
        res.json().then(result => {
          console.log('res ', result)
          if (result.failed) {
            setRequestError(result.failed)
          } else {
            fetch(`http://localhost:5000/user/${username}`, {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            })
              .then(res => {
                res.json().then(result => {
                  if (result.failed) {
                    setRequestError(result.failed)
                  } else {
                    console.log('result ', result.data)
                    let user = new User(result.data)
                    let curFriends = friends
                    curFriends.unshift(user)
                    let curRequests = receivedRequests.filter((request: any) => !(request.username1 == username && request.username2 == Cache.getCurrentUser().username))
                    setReceived(curRequests)
                    setFriends(curFriends)
                  }
                })
              })
          }
        })
      })
  }
  function deleteRequest(username: string) {

  }
  return (
    <div style={{ flex: 1, fontSize: 24, color: "white" }}>
      <div style={{ alignSelf: 'flex-end', display: 'flex', justifyContent: 'flex-end' }}>
        <input
          type="text"
          placeholder="Enter friend to add"
          onChange={(e) => setNewFriend(e.target.value)}
          value={newFriend}
          maxLength={24}
          style={{ marginRight: 8, borderRadius: 6 }}
        />
        <Button
          onClick={sendFriendRequest}
          disabled={newFriend == ""}
          variant="primary"
        >
          Add friend
          {
            requestLoading && (
              <div>loading</div>
            )
          }
        </Button>
      </div>
      {
        receivedRequests && (
          <div>
            Friend Requests
            {
              receivedRequests.map((request: any) => (
                < div
                  style={{ ...styles.request }}
                >
                  <button onClick={() => acceptRequest(request.username1)}>
                    <FaUserPlus color='blue' style={{ backgroundColor: 'transparent' }} />
                  </button>
                  <p style={{ fontSize: "24px", color: "white" }}>{request.username1}</p>
                  <button onClick={() => deleteRequest(request.username1)}>
                    <FaUserMinus color='red' style={{ backgroundColor: 'transparent' }} />
                  </button>
                </div>
              ))}
          </div>
        )
      }
      <BsChevronDoubleRight />  Friends
      < div
        style={{
          flexWrap: "wrap",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {
          friends.map((user) => (
            <div
              style={{ ...styles.friends }}
            >
              <FaUserAlt />
              <p style={{ fontSize: "24px", color: "white", marginLeft: 8 }}>{user.fullname}</p>
            </div>
          ))
        }
      </div >
    </div >
  );
}

const styles = {
  container: {
    display: "flex",
  },
  friends: {
    alignSelf: "baseline",
    backgroundColor: '#333333',
    color: "red",
    width: "33%",
    margin: "2.5%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    boxShadow: "rgba(0, 0, 0) 0px 5px 15px",
  },
  request: {
    alignSelf: "baseline",
    backgroundColor: '#333333',
    paddingLeft: 12,
    paddingRight: 12,
    color: "red",
    width: 240,
    margin: "2.5%",
    alignItems: "center",
    justifyContent: 'space-between',
    display: "flex",
    boxShadow: "rgba(0, 0, 0) 0px 5px 15px",
  }
};

export default Friends;
