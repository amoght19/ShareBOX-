import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1> An Error Occured </h1>
        <Link to={"/"}>Try again</Link>
      </div>
    </>
  );
};

export default Error;
