import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

const BACKEND_URL = "http://localhost:5000/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for handling token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
      toast.error("Your session has expired. Please login again.");
    }
    return Promise.reject(error);
  }
);

// Get user data from localStorage
const getUserFromStorage = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch (error) {
      localStorage.removeItem("user");
      return null;
    }
  }
  return null;
};

// Verify token and get user data
export const verifyToken = createAsyncThunk(
  "auth/verifyToken",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await api.get("/auth/verify");
      return response.data;
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return rejectWithValue("Authentication failed");
    }
  }
);

// Async thunks
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, username, password }, { rejectWithValue }) => {
    try {
      if ((!email && !username) || !password) {
        throw new Error("Email/Username and password are required");
      }
      const response = await api.post("/auth/login", {
        email,
        username,
        password,
      });
      if (!response.data.token || !response.data.user) {
        throw new Error("Invalid response from server");
      }
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      if (error.code === "ECONNABORTED") {
        return rejectWithValue(
          "Connection timeout. Please check if the server is running."
        );
      }
      if (!error.response) {
        return rejectWithValue("Network error. Please check your connection.");
      }
      return rejectWithValue(
        error.response?.data?.message || "Failed to login. Please try again."
      );
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      if (!username || !email || !password) {
        throw new Error("All fields are required");
      }
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }
      const response = await api.post("/auth/register", {
        username,
        email,
        password,
      });
      if (!response.data.token || !response.data.user) {
        throw new Error("Invalid response from server");
      }
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      if (error.code === "ECONNABORTED") {
        return rejectWithValue(
          "Connection timeout. Please check if the server is running."
        );
      }
      if (!error.response) {
        return rejectWithValue("Network error. Please check your connection.");
      }
      return rejectWithValue(
        error.response?.data?.message || "Failed to register. Please try again."
      );
    }
  }
);

// Update profile
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async ({ username, email }, { rejectWithValue }) => {
    try {
      console.log("updateProfile thunk called with:", { username, email });
      if (!username && !email) {
        throw new Error("At least one field is required to update");
      }
      const response = await api.put("/users/profile", {
        username,
        email,
      });
      console.log("Update profile API response:", response.data);
      if (!response.data.user) {
        throw new Error("Invalid response from server");
      }
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      console.error("Update profile error:", error);
      if (error.code === "ECONNABORTED") {
        return rejectWithValue(
          "Connection timeout. Please check if the server is running."
        );
      }
      if (!error.response) {
        return rejectWithValue("Network error. Please check your connection.");
      }
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update profile. Please try again."
      );
    }
  }
);

const initialState = {
  user: getUserFromStorage(),
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      toast.success("Logged out successfully");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Verify Token
      .addCase(verifyToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
        toast.success("Welcome back! You've been logged in successfully.");
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        toast.error(
          action.payload || "Login failed. Please check your credentials."
        );
      })
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
        toast.success("Account created successfully! Welcome aboard.");
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        toast.error(action.payload || "Registration failed. Please try again.");
      })
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.error = null;
        toast.success("Your profile has been updated successfully.");
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(
          action.payload || "Failed to update profile. Please try again."
        );
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
