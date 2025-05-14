import React from "react";
import { Modal } from "react-bootstrap";
import ReactPlayer from "react-player";

const TrailerPlayerModal = ({ show, onHide, trailer }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Body className="bg-dark p-0">
        <div className="ratio ratio-16x9">
          <ReactPlayer
            url={trailer ? `https://www.youtube.com/watch?v=${trailer}` : ""}
            width="100%"
            height="100%"
            playing
            controls
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default TrailerPlayerModal;
