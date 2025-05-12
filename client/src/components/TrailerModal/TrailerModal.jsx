import React, { useState } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import ReactPlayer from "react-player";
import { IoPlayCircleSharp } from "react-icons/io5";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  removeLikedMovie,
  addToLikedMovies,
} from "../../store/Slice/movie-slice";

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
  const [isLikedState, setIsLikedState] = useState(isLiked);
  const [isDisliked, setIsDisliked] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const handlePlayStateChange = (playing) => {
    setIsPlaying(playing);
    onPlayStateChange?.(playing);
  };

  const addToMovieLikedList = async () => {
    if (!user) {
      toast.error("Please login to add movies to your list");
      navigate("/login");
      return;
    }

    try {
      const movieData = {
        id: movie.id,
        name: movie.name || movie.title || "Unknown",
        image: movie.image || movie.backdrop_path,
        poster: movie.poster || movie.poster_path,
        genres: movie.genres || [],
      };

      await dispatch(
        addToLikedMovies({ email: user.email, movie: movieData })
      ).unwrap();
      setIsLikedState(true);
      toast.success("Movie added to your list");
    } catch (err) {
      toast.error(err.message || "Failed to add movie to your list");
      console.log(err);
    }
  };

  const removeFromMovieLikedList = async () => {
    if (!user) {
      toast.error("Please login to remove movies from your list");
      navigate("/login");
      return;
    }

    try {
      await dispatch(
        removeLikedMovie({ email: user.email, movieId: movie.id })
      ).unwrap();
      setIsLikedState(false);
      toast.success("Movie removed from your list");
    } catch (err) {
      toast.error(err.message || "Failed to remove movie from your list");
      console.log(err);
    }
  };

  const handleLike = () => {
    toast.success("Movie added to your list");
    setIsLikedState(true);
    setIsDisliked(false);
  };

  const handleDislike = async () => {
    if (!user) {
      toast.error("Please login to dislike movies");
      navigate("/login");
      return;
    }

    try {
      if (isLikedState) {
        await dispatch(
          removeLikedMovie({ email: user.email, movieId: movie.id })
        ).unwrap();
        setIsLikedState(false);
        toast.success("Movie removed from your list");
      }
      setIsDisliked(true);
    } catch (err) {
      toast.error(err.message || "Failed to remove movie from your list");
      console.log(err);
    }
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
      size="lg"
      centered
      className="trailer-modal"
    >
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>{movie.name || movie.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-white p-0">
        <div className="ratio ratio-16x9">
          <ReactPlayer
            url={trailer}
            width="100%"
            height="100%"
            playing={isPlaying}
            controls={true}
            onPlay={handlePlayStateChange}
            onPause={handlePlayStateChange}
          />
        </div>
        <div className="p-4">
          <Row className="mb-4">
            <Col>
              <div className="d-flex gap-3">
                <Button variant="light" onClick={playTrailer}>
                  <IoPlayCircleSharp className="me-2" />
                  Play
                </Button>
                <Button
                  variant={isLikedState ? "light" : "outline-light"}
                  onClick={handleLike}
                >
                  <RiThumbUpFill className="me-2" />
                  Like
                </Button>
                <Button
                  variant={isDisliked ? "light" : "outline-light"}
                  onClick={handleDislike}
                >
                  <RiThumbDownFill className="me-2" />
                  Dislike
                </Button>
                {isLikedState ? (
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
