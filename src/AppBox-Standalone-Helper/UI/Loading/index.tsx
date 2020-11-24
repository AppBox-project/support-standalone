import { CircularProgress } from "@material-ui/core";
import React from "react";

const Loading: React.FC<{ label?: string }> = ({ label }) => (
  <div className="center" style={{ width: "100%", height: "100%" }}>
    <CircularProgress />
    {label && (
      <>
        <br />
        {label}
      </>
    )}
  </div>
);

export default Loading;
