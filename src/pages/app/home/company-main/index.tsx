import React, { useState } from "react";
import Default from "./company-default";

import CompanyHeader from "./company-header";
import Profile from "./profile-page";
import Upload from "./upload-page";

export type CompanyMainState =
  | "default"
  | "search"
  | "profile"
  | "log_out"
  | "upload";
export type MediaTypeState = "empty" | "movie" | "series";
function MainCompany(): JSX.Element {
  const [state, setState] = useState<CompanyMainState>("upload");
  const [mediaType, setMediaType] = useState<MediaTypeState>("movie");

  return (
    <div
      className="overflow-auto"
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
        <div style={styles.container}>
          <Default changeState={setState} changeMedia={setMediaType} />
        </div>
      )}
      {state == "profile" && (
        <div style={styles.container}>
          <Profile />
        </div>
      )}
      {state == "log_out" && (
        <div style={{ color: "white" }}>I am sea case</div>
      )}
      {state == "upload" && (
        <div style={{ color: "white" }}>
          <Upload mediaProduct={mediaType} />
        </div>
      )}
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
