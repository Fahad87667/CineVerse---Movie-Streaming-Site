import React from "react";
import { Container } from "react-bootstrap";

const NotFound = ({ message = "Page not found" }) => {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <h1 className="text-white mb-4">404</h1>
      <p className="text-light mb-4">{message}</p>
      <button className="btn btn-primary" onClick={() => window.history.back()}>
        Go Back
      </button>
    </Container>
  );
};

export default NotFound;
