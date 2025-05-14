import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserLikedMovies } from "../store/Slice/movie-slice";
import Card from "../components/Card/Card";
import "./MyList.scss";

const MyList = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { likedMovies } = useSelector((state) => state.movie);
  const [sortBy, setSortBy] = useState("recent");
  const [filterGenre, setFilterGenre] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (user) {
      dispatch(getUserLikedMovies(user.email));
    }
  }, [dispatch, user]);

  const getUniqueGenres = (movies) => {
    const genres = new Set();
    movies.forEach((movie) => {
      movie.genres?.forEach((genre) => genres.add(genre));
    });
    return Array.from(genres);
  };

  const filterAndSortMovies = (movies) => {
    let filtered = [...movies];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((movie) =>
        movie.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply genre filter
    if (filterGenre !== "all") {
      filtered = filtered.filter((movie) =>
        movie.genres?.includes(filterGenre)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "recent":
      default:
        // Assuming movies are already in chronological order
        break;
    }

    return filtered;
  };

  const genres = getUniqueGenres(likedMovies);
  const filteredMovies = filterAndSortMovies(likedMovies);

  return (
    <Container className="my-list-container">
      <Row className="mb-4">
        <Col>
          <h2>My List</h2>
        </Col>
      </Row>

      <Row className="filters-section">
        <Col md={4}>
          <Form.Group>
            <Form.Label>Search Movies</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Sort By</Form.Label>
            <Form.Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="recent">Most Recent</option>
              <option value="name">Name</option>
              <option value="rating">Rating</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Filter by Genre</Form.Label>
            <Form.Select
              value={filterGenre}
              onChange={(e) => setFilterGenre(e.target.value)}
            >
              <option value="all">All Genres</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row className="movie-grid">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <Col
              key={movie.id}
              xs={6}
              sm={4}
              md={3}
              lg={2}
              className="movie-card"
            >
              <Card movie={movie} isLiked={true} />
            </Col>
          ))
        ) : (
          <Col>
            <div className="text-center">
              <p>No movies found in your list.</p>
            </div>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default MyList;
