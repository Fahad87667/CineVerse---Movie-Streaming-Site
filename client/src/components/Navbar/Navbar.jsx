import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Form, InputGroup } from "react-bootstrap";
import { FaSearch, FaBell, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoviesWithGenre } from "../../store/Slice/movie-slice";
import SearchMovie from "../SearchMovie/SearchMovie";
import { logout } from "../../store/Slice/auth-slice";
import { toast } from "react-hot-toast";
import "./Navbar.css";

const NavigationBar = ({ isScrolled, isGenresActive, hideNavbar = false }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isPlaying, setIsPlaying] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "TV Shows", path: "/tv-shows" },
    { name: "Movies", path: "/movies" },
    { name: "New & Popular", path: "/new-popular" },
    { name: "My List", path: "/my-list" },
    { name: "About Us", path: "/about" },
  ];

  const genres = useSelector((state) => state.movie.genres);
  const [searchedInput, setSearchedInput] = useState("");
  const [showSearchResult, setShowSearchResult] = useState(false);

  // Regex patterns
  const searchPattern = /^[a-zA-Z0-9\s\-_.,!?]{1,50}$/;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const getMoviesWithGenre = (genreId) => {
    dispatch(fetchMoviesWithGenre({ type: "movie", genre: genreId }));
  };

  const searchMovieHandler = (e) => {
    const value = e.target.value;

    // Validate search input
    if (value && !searchPattern.test(value)) {
      toast.error(
        "Search can only contain letters, numbers, and basic punctuation"
      );
      return;
    }

    setShowSearchResult(true);
    setSearchedInput(value);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (hideNavbar || isPlaying) {
    return null;
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="navbar">
      <Container fluid className="px-4">
        <Navbar.Brand as={Link} to="/" className="me-4">
          CineVerse
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto d-flex align-items-center">
            {links.map((link, index) => (
              <Nav.Link key={index} as={Link} to={link.path} className="px-3">
                {link.name}
              </Nav.Link>
            ))}
          </Nav>

          <div className="d-flex align-items-center gap-3">
            <InputGroup className="search-input" style={{ width: "300px" }}>
              <InputGroup.Text className="bg-transparent border-end-0">
                <FaSearch className="text-light" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search for a movie, tv show, person..."
                onChange={searchMovieHandler}
                className="border-start-0"
                maxLength={50}
                pattern={searchPattern.source}
                title="Only letters, numbers, and basic punctuation allowed"
              />
            </InputGroup>
            <div
              className="user-menu"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <FaUser className="icon" />
              {showUserMenu && (
                <div className="user-dropdown">
                  <div className="user-info">
                    <span className="user-name">
                      {user?.username || user?.name || user?.email}
                    </span>
                  </div>
                  <div className="dropdown-divider"></div>
                  <button
                    id="signout"
                    className="btn dropdown-item me-5"
                    onClick={handleLogout}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
      {showSearchResult && (
        <SearchMovie
          showSearchResult={showSearchResult}
          setShowSearchResult={setShowSearchResult}
          searchedInput={searchedInput}
          onPlayStateChange={setIsPlaying}
        />
      )}
    </Navbar>
  );
};

export default NavigationBar;
