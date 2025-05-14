import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "../pages/Home";
import Trailer from "../pages/Trailer";
import Movies from "../pages/Movies";
import TvShows from "../pages/TvShows";
import NewPopular from "../pages/NewPopular";
import MyList from "../pages/MyList";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AboutUs from "../pages/AboutUs";
import Profile from "../pages/Profile";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const createRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/about" element={<AboutUs />} />
    <Route path="/" element={<Home />} />
    <Route path="/trailer" element={<Trailer />} />
    <Route path="/movies" element={<Movies />} />
    <Route path="/tv-shows" element={<TvShows />} />
    <Route path="/new-popular" element={<NewPopular />} />
    <Route
      path="/my-list"
      element={
        <ProtectedRoute>
          <MyList />
        </ProtectedRoute>
      }
    />
    <Route
      path="/profile"
      element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default createRoutes;
