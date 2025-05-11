import React, { useState } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import ReactPlayer from "react-player";
import { IoPlayCircleSharp } from "react-icons/io5";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { removeLikedMovie } from "../../store/Slice/movie-slice";

const TrailerModal = ({
  movie,
  handleModal,
  isLiked,
  trailer,
  onPlayStateChange,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayStateChange = (playing) => {
    setIsPlaying(playing);
    onPlayStateChange?.(playing);
  };

  const addToMovieLikedList = async () => {
    try {
      await axios.post("https://mern-movie-project.vercel.app/api/users/add", {
        movie: movie,
      });
      toast("Movie added to your list", {
        icon: "👌",
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    } catch (err) {
      toast(err.message, {
        icon: "❌",
        style: {
          background: "#333",
          color: "#fff",
        },
      });
      console.log(err);
    }
  };

  const removeFromMovieLikedList = () => {
    dispatch(removeLikedMovie({ movie: movie }));
    toast("Movie removed from your list", {
      icon: "👌",
      style: {
        background: "#333",
        color: "#fff",
      },
    });
  };

  const playTrailer = () => {
    navigate("/trailer", {
      replace: true,
      state: {
        movie: movie,
      },
    });
  };

  return (
    <Modal
      show={true}
      onHide={() => handleModal(false)}
      size="xl"
      centered
      className="trailer-modal"
    >
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>{movie.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-white p-0">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${trailer}`}
          width="100%"
          height="500px"
          playing
          controls
          muted
          onPlay={() => handlePlayStateChange(true)}
          onPause={() => handlePlayStateChange(false)}
          onEnded={() => handlePlayStateChange(false)}
          onError={(e) => {
            console.log("YouTube player error:", e);
            toast.error(
              "Failed to load video. This might be due to an ad blocker."
            );
          }}
          config={{
            youtube: {
              playerVars: {
                origin: window.location.origin,
                modestbranding: 1,
                rel: 0,
              },
            },
          }}
        />
        <div className="p-4">
          <Row className="mb-4">
            <Col>
              <div className="d-flex gap-3">
                <Button variant="light" onClick={playTrailer}>
                  <IoPlayCircleSharp className="me-2" />
                  Play
                </Button>
                <Button variant="outline-light">
                  <RiThumbUpFill className="me-2" />
                  Like
                </Button>
                <Button variant="outline-light">
                  <RiThumbDownFill className="me-2" />
                  Dislike
                </Button>
                {isLiked ? (
                  <Button
                    variant="outline-light"
                    onClick={removeFromMovieLikedList}
                  >
                    <AiOutlineCheck className="me-2" />
                    Remove from List
                  </Button>
                ) : (
                  <Button variant="outline-light" onClick={addToMovieLikedList}>
                    <AiOutlinePlus className="me-2" />
                    Add to my list
                  </Button>
                )}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5 className="mb-3">Overview</h5>
              <p className="mb-4">{movie.overview}</p>
              <div className="movie-details">
                <p>
                  <strong>Release Date:</strong> {movie.release_date}
                </p>
                <p>
                  <strong>Rating:</strong> {movie.vote_average}
                </p>
                <p>
                  <strong>Genres:</strong>{" "}
                  {movie.genres.map((genre, index) => (
                    <span key={index} className="me-2">
                      {genre}
                    </span>
                  ))}
                </p>
                <p>
                  <strong>Language:</strong> {movie.original_language}
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default TrailerModal;
