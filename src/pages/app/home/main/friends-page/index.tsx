import { wrap } from "module";
import React, { HTMLAttributes, useEffect, useState } from "react";
import { Button, ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { FaUserAlt } from 'react-icons/fa';
import { BsChevronDoubleRight } from 'react-icons/bs';
import { User, UserType } from "../../../../../shared/models/user";

//import { APP_STYLES } from "../../../../shared/styles";
function Friends(): JSX.Element {
  const [friends, setFriends] = useState<User[]>([]);

  useEffect(() => {
    let newUser = new User({
      username: "Leylusa",
      fullname: "Leyla Hashimli",
      email: "leyla.hashimli@lolu.com",
      birthday: new Date("09/12/2000"),
    });
    let userList = [];
    userList.push(newUser);
    newUser = new User({
      username: "Leylusa",
      fullname: "Javid Hashimli",
      email: "leyla.hashimli@lolu.com",
      birthday: new Date("09/12/2000"),
    });
    userList.push(newUser);

    newUser = new User({
      username: "Leylusa",
      fullname: "A Huseynov",
      email: "leyla.hashimli@lolu.com",
      birthday: new Date("09/12/2000"),
    });
    userList.push(newUser);
    newUser = new User({
      username: "Leylusa",
      fullname: "Leyla Ismayilova",
      email: "leyla.hashimli@lolu.com",
      birthday: new Date("09/12/2000"),
    });
    userList.push(newUser);
    setFriends(userList);
  });

  return (
    <div style={{ flex: 1, fontSize: 24, color: "white" }}>
      <BsChevronDoubleRight />  Friends
      <div
        style={{
          flexWrap: "wrap",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {friends.map((user) => (
          <div
            style={{...styles.friends }}
          >
            <FaUserAlt  />
            <p style={{ fontSize: "24px", color: "white", marginLeft: 8 }}>   {user.fullname}</p> 
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
  },
  friends: {
    alignSelf: "baseline",
    backgroundColor:'#333333',
    color: "red",
    width: "33%",
    margin: "2.5%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    boxShadow: "rgba(0, 0, 0) 0px 5px 15px",
  },
};

export default Friends;
