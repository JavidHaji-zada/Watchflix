import React, { useState } from "react";
import Default from "./company-default";

import CompanyHeader from "./company-header";
import Profile from "./profile-page";

export type CompanyMainState =
  | "default"
  | "upload"
  | "search"
  | "profile"
  | "log_out";
function MainCompany(): JSX.Element {
  const [state, setState] = useState<CompanyMainState>("default");

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "#333333",
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 24,
      }}
    >
      <CompanyHeader changeState={setState} />
      {state == "default" && (
        <div style={styles.container}><Default/></div>
      )}
      {state == "upload" && <div style={styles.container}>Here is upload</div>}
      {state == "search" && <div style={{ color: "white" }}>I am sea case</div>}
      {state == "profile" && <div style={styles.container}><Profile/></div>}
      {state == "log_out" && <div style={{ color: "white" }}>I am sea case</div>}
    </div>
  );
}

const styles = {
  container: {
    flex: 1,
    display: "flex",
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 24,
  },
};

export default MainCompany;
