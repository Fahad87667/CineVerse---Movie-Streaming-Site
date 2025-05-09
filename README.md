# CineVerse - Movie Streaming Site

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application for streaming movies.

## Features

- 🎬 Browse trending movies
- 🔍 Search movies by title
- 🎯 Filter movies by genre
- ❤️ Create personalized watchlists
- 🎥 Watch movie trailers
- 🔐 User authentication and authorization
- 📱 Responsive design

## Tech Stack

- **Frontend**: React.js, Redux Toolkit, Vite, Bootstrap, Styled Components
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **External API**: TMDB (The Movie Database)
- **Authentication**: JWT (JSON Web Tokens)
- **API Testing**: Postman
- **Version Control**: Git

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- TMDB API Key

## Implementation Steps

### 1. Backend Setup

1. Create a new directory for the backend
2. Initialize Node.js project: `npm init -y`
3. Install required dependencies:
   ```bash
   npm install express mongoose dotenv cors bcryptjs jsonwebtoken
   ```
4. Create the following directory structure:
   ```
   backend/
   ├── config/
   ├── controllers/
   ├── middleware/
   ├── models/
   ├── routes/
   └── server.js
   ```

### 2. Frontend Setup

1. Create a new React application:
   ```bash
   npx create-react-app client
   cd client
   ```
2. Install required dependencies:
   ```bash
   npm install axios react-router-dom @mui/material @emotion/react @emotion/styled
   ```

### 3. Database Setup

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Add it to your `.env` file:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

### 4. Environment Setup

1. Backend `.env`:

   ```env
   MONGODB_URI=mongodb://localhost:27017/movie_db
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

2. Frontend `.env`:
   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify JWT token

### User Operations

- `GET /api/users/liked/:email` - Get user's liked movies
- `POST /api/users/add` - Add movie to liked list
- `PUT /api/users/remove` - Remove movie from liked list
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

### Movie Operations (TMDB API)

- `GET /trending/movie/week` - Get trending movies
- `GET /genre/movie/list` - Get movie genres
- `GET /discover/movie` - Get movies by genre
- `GET /search/movie` - Search movies
- `GET /movie/{id}/videos` - Get movie trailers

## Database Schema

### User Model

```javascript
{
  email: String,
  password: String (hashed),
  likedMovies: [{
    id: Number,
    name: String,
    image: String,
    poster: String,
    genres: [String]
  }]
}
```

### Movie Data Structure

```javascript
{
  id: Number,          // Movie ID from TMDB
  name: String,        // Movie title
  image: String,       // Backdrop path
  poster: String,      // Poster path
  genres: [String],    // Array of genre names
  backdrop_path: String, // Full backdrop URL
  poster_path: String,  // Full poster URL
  genre_ids: [Number]  // Array of genre IDs
}
```

## Running the Application

1. Start both frontend and backend:

   ```bash
   npm start
   ```

2. Start only the backend:

   ```bash
   npm run backend
   ```

3. Start only the frontend:
   ```bash
   npm run frontend
   ```

The application will be available at:

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Security Considerations

1. Implement input validation
2. Use environment variables
3. Implement rate limiting
4. Set up CORS properly
5. Use HTTPS
6. Implement proper error handling

## Performance Optimization

1. Implement caching
2. Optimize images
3. Use lazy loading
4. Implement pagination
5. Optimize database queries

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the movie data API
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Express.js](https://expressjs.com/)

---
