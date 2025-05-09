import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import { getUserLikedMovies } from "../store/Slice/movie-slice";
import "../assets/styles/Movies.scss";
import NotFound from "../components/NotFound/NotFound";
import Card from "../components/Card/Card";
import { toast } from "react-hot-toast";

const MyList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { likedMovies, status, error } = useSelector((state) => state.movie);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLikedMovies = async () => {
      if (!user?.email) {
        toast.error("Please login to view your liked movies");
        navigate("/login");
        return;
      }

      try {
        setIsLoading(true);
        await dispatch(getUserLikedMovies(user.email)).unwrap();
      } catch (error) {
        console.error("Error fetching liked movies:", error);
        toast.error(error.message || "Failed to fetch liked movies");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLikedMovies();
  }, [dispatch, user, navigate]);

  if (isLoading || status === "pending") {
    return (
      <div className="container-fluid px-4 py-5">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid px-4 py-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-4 py-5 mt-5">
      {likedMovies && likedMovies.length > 0 ? (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
          {likedMovies.map((movie) => (
            <div key={movie.id} className="col">
              <Card movie={movie} isLiked={true} />
            </div>
          ))}
        </div>
      ) : (
        <NotFound message="No liked movies found. Start adding movies to your list!" />
      )}
    </div>
  );
};

export default MyList;
