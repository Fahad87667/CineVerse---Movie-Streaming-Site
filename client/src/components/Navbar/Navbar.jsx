import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Form, InputGroup } from "react-bootstrap";
import { FaSearch, FaBell, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoviesWithGenre } from "../../store/Slice/movie-slice";
import SearchMovie from "../SearchMovie/SearchMovie";
import { logout } from "../../store/Slice/auth-slice";
import "./Navbar.css";

const NavigationBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getMoviesWithGenre = (genreId) => {
    dispatch(fetchMoviesWithGenre({ type: "movie", genre: genreId }));
  };

  const searchMovieHandler = (e) => {
    setShowSearchResult(true);
    setSearchedInput(e.target.value);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Navbar
      bg={isScrolled ? "dark" : "transparent"}
      variant={isScrolled ? "dark" : "light"}
      expand="lg"
      fixed="top"
      className={`navbar ${isScrolled ? "scrolled" : ""}`}
    >
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
                  <button id="signout" className="btn dropdown-item" onClick={handleLogout}>
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
        />
      )}
    </Navbar>
  );
};

export default NavigationBar;
