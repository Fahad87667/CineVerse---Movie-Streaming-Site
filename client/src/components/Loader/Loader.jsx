import React from "react";
import { Spinner } from "react-bootstrap";
import "./Loader.scss";

const Loader = () => {
  return (
    <div className="loader-container">
      <Spinner
        animation="border"
        variant="light"
        role="status"
        aria-label="Loading"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loader;
