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
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      }
    />
    <Route
      path="/trailer"
      element={
        <ProtectedRoute>
          <Trailer />
        </ProtectedRoute>
      }
    />
    <Route
      path="/movies"
      element={
        <ProtectedRoute>
          <Movies />
        </ProtectedRoute>
      }
    />
    <Route
      path="/tv-shows"
      element={
        <ProtectedRoute>
          <TvShows />
        </ProtectedRoute>
      }
    />
    <Route
      path="/new-popular"
      element={
        <ProtectedRoute>
          <NewPopular />
        </ProtectedRoute>
      }
    />
    <Route
      path="/my-list"
      element={
        <ProtectedRoute>
          <MyList />
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default createRoutes;
