# CineVerse - Movie Streaming Site

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application for streaming movies.

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
   ```

### 4. Features to Implement

1. User Authentication

   - Registration
   - Login
   - JWT token management

2. Movie Management

   - Movie listing
   - Movie details
   - Search functionality
   - Filtering options

3. User Features

   - Watchlist
   - Rating system
   - User profile

4. Admin Features
   - Add/Edit/Delete movies
   - User management
   - Analytics dashboard

### 5. API Endpoints

1. Authentication

   - POST /api/auth/register
   - POST /api/auth/login

2. Movies

   - GET /api/movies
   - GET /api/movies/:id
   - POST /api/movies (admin)
   - PUT /api/movies/:id (admin)
   - DELETE /api/movies/:id (admin)

3. User
   - GET /api/user/profile
   - PUT /api/user/profile
   - GET /api/user/watchlist
   - POST /api/user/watchlist

### 6. Running the Application

1. Start the backend:

   ```bash
   cd backend
   npm start
   ```

2. Start the frontend:
   ```bash
   cd client
   npm start
   ```

### 7. Testing

1. Test all API endpoints using Postman
2. Test user flows:
   - Registration
   - Login
   - Movie browsing
   - Watchlist management
3. Test admin features
4. Cross-browser testing

### 8. Deployment

1. Backend Deployment

   - Deploy to Heroku/Render
   - Set up environment variables
   - Configure CORS

2. Frontend Deployment
   - Build the React app
   - Deploy to Netlify/Vercel
   - Configure environment variables

### 9. Security Considerations

1. Implement input validation
2. Use environment variables
3. Implement rate limiting
4. Set up CORS properly
5. Use HTTPS
6. Implement proper error handling

### 10. Performance Optimization

1. Implement caching
2. Optimize images
3. Use lazy loading
4. Implement pagination
5. Optimize database queries

## Tech Stack

- Frontend: React.js, Material-UI
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT
- State Management: React Context/Redux
- API Testing: Postman
- Version Control: Git

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

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

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- TMDB API Key

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd cineverse
```

2. Install dependencies:

```bash
npm run install-all
```

3. Create a `.env` file in the backend directory:

```env
MONGODB_URI=mongodb://localhost:27017/movie_db
JWT_SECRET=your_jwt_secret
PORT=5000
```

4. Create a `.env` file in the client directory:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
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

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify JWT token

### User Operations

- `GET /api/users/liked/:email` - Get user's liked movies
- `POST /api/users/add` - Add movie to liked list
- `PUT /api/users/remove` - Remove movie from liked list

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

## CRUD Operations

### Create

- Register new user
- Add movie to liked list

### Read

- Get user profile
- Get liked movies
- Fetch trending movies
- Search movies
- Get movie details

### Update

- Update user profile
- Modify liked movies list

### Delete

- Remove movie from liked list
- Delete user account

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

# MERN Movie Project

<div align="center">
<h3> 🛠️ Built With</h3>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"></img>
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"></img>
<img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white"></img>
<img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white"></img>
<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"></img>
<img src="	https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"></img>
<img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge"></img>
<img src="https://img.shields.io/badge/firebase-eeeeee?style=for-the-badge&logo=firebase&logoColor=f5c518"></img>
<img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white"></img>
<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"></img>
</div>

<div align="center">
<h3>✨ Live Version </h3>

### [You can see the live version here.](https://moviedb-ed.vercel.app)

</div>

<div align="center">
<h2> 🖋️ About</h2>
<p>This project is a mern stack project. The project is a movie site application. By registering on the site, the user can see popular movies, watch trailers and save them to the list for later viewing. React.js is used in the frontend part of the project. Redux toolkit is used as state management. Sass is used as UI library. Firebase was used for authentication processes. Mongodb is used to keep the database of the movies that the user likes and wants to watch later. Node.js and express.js were used to establish the connection between Mongodb and the application.</p>
</div>

<div align="center">
<h2>💻 Project Desktop Views </h2>
<img src="https://user-images.githubusercontent.com/72731296/210180202-592e6be2-a2e8-4fad-bfdf-c06a040f66ff.png" alt="Image" width="400">
<img src="https://user-images.githubusercontent.com/72731296/210180204-27103e17-4da4-482c-9f12-7fdb8b5d7311.png" alt="Image" width="400">

<img src="https://user-images.githubusercontent.com/72731296/210180219-6f8fb6a1-448b-4256-a6a7-b68ca7eb8fe8.png" alt="Image" width="400">
<img src="https://user-images.githubusercontent.com/72731296/210180222-53d8bfd2-39c0-468d-87aa-7c22ea871751.png" alt="Image" width="400">

<img src="https://user-images.githubusercontent.com/72731296/210180245-6d2f0ae1-97db-40ba-b2b2-49a9454c8215.png" alt="Image" width="400">
<img src="https://user-images.githubusercontent.com/72731296/210180243-787a7dcc-a5b7-4020-b36e-764c2d1fdb1a.png" alt="Image" width="400">
</div>

<div align="center">
<h2>💻 Project Mobile Views </h2>
<img src="https://user-images.githubusercontent.com/72731296/210180274-7d1774ad-8a88-4d48-887c-00ad9f8d407e.png" alt="Image" align="left" width="250" >
<img src="https://user-images.githubusercontent.com/72731296/210180324-f026d149-d509-4f61-9100-9c10fcd59e2f.png" alt="Image" align="center" width="250" >
<img src="https://user-images.githubusercontent.com/72731296/210180332-770ce1b7-2be6-46c4-8da2-64b50b4ec7fd.png" alt="Image" align="right" width="250" >
</div>

### 🛠 **Tech Stack**

- [React](https://reactjs.org/)
- [Redux-Toolkit](https://redux-toolkit.js.org/)
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [SASS](https://sass-lang.com/guide)
- [Firebase](https://firebase.google.com)
- [Vite](https://vitejs.dev/)

<div align="center">
<h2> Project Video </h2>

[bandicam 2023-01-03 23-26-52-282.webm](https://user-images.githubusercontent.com/72731296/210437165-dd9090fa-2246-4ab1-9e53-35e0f694f02e.webm)

[bandicam 2023-01-03 23-38-33-764.webm](https://user-images.githubusercontent.com/72731296/210438467-4f019b14-fd81-461d-b6a0-b5c9a1cce812.webm)

</div>

<div align="center" >
    <h2> 🎆 Desktop Screenshots </h2>
    <img src="https://user-images.githubusercontent.com/72731296/210180367-d4403a39-5c12-4f30-8657-918b11665a27.png" width="700"/>
    <img src="https://user-images.githubusercontent.com/72731296/210180381-9aacd10b-d60c-4c36-b248-b1dae83d4779.png" width="700"/>
    <img src="https://user-images.githubusercontent.com/72731296/210180398-b32dd5f7-ca7d-47d0-8ef8-8ef64ceccb52.png" width="700"/>
    <img src="https://user-images.githubusercontent.com/72731296/210180416-53f5f74f-ea02-44b5-b038-c78836206e9e.png" width="700"/>
    <img src="https://user-images.githubusercontent.com/72731296/210180438-365b8d33-6b1b-4ffa-9eca-030e96937b43.png" width="700"/>
 </div>

 <div align="center"> 
 <h2> 📫 Contact Address</h2>
<a href="https://github.com/emircandemr" target="_blank">
<img src=https://img.shields.io/badge/github-%2324292e.svg?&style=for-the-badge&logo=github&logoColor=white alt=github style="margin-right: 5px;" />
</a>
<a href="https://twitter.com/emircandmir" target="_blank">
<img src=https://img.shields.io/badge/twitter-%2300acee.svg?&style=for-the-badge&logo=twitter&logoColor=white alt=twitter style="margin-right: 5px;" />
</a>
<a href="https://www.linkedin.com/in/emircandemr/" target="_blank">
<img src=https://img.shields.io/badge/linkedin-%231E77B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white alt=linkedin style="margin-right: 5px;" />
</a>
 </div>

<div align="center">
<h3> ⭐ Support </h3>
<p> If you like the application, do not forget to give a star 😊 </p>
</div>

## Getting Started

To get started you can simply clone this `MERN_Movie_Project.git` repository and install the dependencies.
Clone the `MERN_Movie_Project.git` repository using git:

```bash
git clone https://github.com/emircandemr/MERN_Movie_Project.git

cd MERN_Movie_Project.git
```

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```
