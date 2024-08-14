import React from "react";
import "../../../styles/loader.css";

const Loader = ({ className, title }) => {
  return (
    <div
      style={{ position: "absolute", margin: "40px 50px", width: "70%" }}
      className={className ? "slots-fetch" : ""}
    >
      <div className="book m-auto mb-5 mt-5">
        <div className="book__pg-shadow" />
        <div className="book__pg" />
        <div className="book__pg book__pg--2" />
        <div className="book__pg book__pg--3" />
        <div className="book__pg book__pg--4" />
        <div className="book__pg book__pg--5" />
      </div>
      
      <h4 className="text-secondary text-center">
        {title ? (
          <>{title}</>
        ) : (
          <>
            Please hold ! on for a moment as we gather data from the database.
          </>
        )}
      </h4>
    </div>
  );
};

export default Loader;
