import React, { useState } from "react";
import Default from "./company-default";

import CompanyHeader from "./company-header";

export type CompanyMainState =
  | "default"
  | "movies"
  | "series"
  | "upload"
  | "search";
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
      {state == "movies" && (
        <div style={{ color: "white" }}> I am sea case </div>
      )}
      {state == "series" && (
        <div style={{ color: "white" }}> I am sea case </div>
      )}
      {state == "upload" && <div style={styles.container}>Here is upload</div>}
      {state == "search" && <div style={{ color: "white" }}>I am sea case</div>}
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
