import React from "react";

const Loading = () => {
  return (
    <div className="m-5  text-center">
      <div className="spinner-grow text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
      </div>
    </div>
  );
};

export default Loading;
