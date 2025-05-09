import User from "../models/UserModel.js";

export const addtoLikedMovies = async (req, res) => {
  try {
    const { email, movie } = req.body;
    console.log("Adding movie to liked movies:", { email, movie });

    if (!email || !movie) {
      console.log("Missing email or movie data");
      return res.status(400).json({ message: "Email and movie are required" });
    }

    const user = await User.findOne({ email });
    if (user) {
      const likedMovies = user.likedMovies;
      const movieExists = likedMovies.find((m) => m.id === movie.id);
      if (movieExists) {
        console.log("Movie already liked");
        return res.status(200).json({ message: "Movie already liked", user });
      }
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { $push: { likedMovies: movie } },
        { new: true }
      );
      console.log("Movie added successfully");
      return res
        .status(200)
        .json({ message: "Movie added to liked movies", user: updatedUser });
    } else {
      console.log("Creating new user with liked movie");
      const newUser = await User.create({ email, likedMovies: [movie] });
      return res
        .status(201)
        .json({ message: "User created and movie added", user: newUser });
    }
  } catch (err) {
    console.error("Error in addtoLikedMovies:", err);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
};

export const getLikedMovies = async (req, res) => {
  try {
    const { email } = req.params;
    console.log("=== Get Liked Movies Debug ===");
    console.log("Request params:", req.params);
    console.log("Email from params:", email);

    if (!email) {
      console.log("Email is missing");
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    console.log(
      "User found:",
      user
        ? {
            email: user.email,
            likedMoviesCount: user.likedMovies.length,
            likedMovies: user.likedMovies,
          }
        : "No user found"
    );

    if (user) {
      console.log("Sending response with movies:", user.likedMovies);
      return res
        .status(200)
        .json({ message: "Success", movies: user.likedMovies });
    }
    console.log("User not found");
    return res.status(404).json({ message: "User not found" });
  } catch (err) {
    console.error("Error in getLikedMovies:", err);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
};

export const removeFromLikedMovies = async (req, res) => {
  try {
    const { email, movie } = req.body;
    console.log("Removing movie from liked movies:", { email, movie });

    if (!email || !movie) {
      console.log("Missing email or movie data");
      return res.status(400).json({ message: "Email and movie are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $pull: { likedMovies: { id: movie.id } } },
      { new: true }
    );

    console.log("Movie removed successfully");
    return res.status(200).json({
      message: "Movie removed from liked movies",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Error in removeFromLikedMovies:", err);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
};
