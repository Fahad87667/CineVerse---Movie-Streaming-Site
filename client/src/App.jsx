import React, { useEffect } from "react";
import { BrowserRouter, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { verifyToken } from "./store/Slice/auth-slice";
import createRoutes from "./router/router";
import NavigationBar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(verifyToken());
    }
  }, [dispatch]);

  if (loading) {
    return (
      <div className="loader">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      {isAuthenticated && <NavigationBar />}
      <Toaster position="top-center" reverseOrder={false} />
      {createRoutes()}
      <Footer />
    </BrowserRouter>
  );
};

export default App;
