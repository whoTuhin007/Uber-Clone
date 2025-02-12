# Uber Clone

This project is a clone of Uber, built using Node.js, Express, MongoDB for the backend, and React with Vite for the frontend. It provides functionalities for user and captain registration, login, ride management, and map services.

## Table of Contents

- [Installation](#installation)
- [Backend](#backend)
  - [File Descriptions](#file-descriptions)
  - [API Endpoints](#api-endpoints)
- [Frontend](#frontend)
  - [File Descriptions](#file-descriptions-1)
- [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    ```
2. Navigate to the backend directory:
    ```sh
    cd backend
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
4. Create a `.env` file and add the following environment variables:
    ```env
    PORT=3000
    JWT_SECRET=your_jwt_secret
    GOOGLE_MAPS_API_KEY=your_google_maps_api_key
    ```
5. Start the server:
    ```sh
    npm start
    ```
6. Navigate to the frontend directory:
    ```sh
    cd ../frontend
    ```
7. Install dependencies:
    ```sh
    npm install
    ```
8. Start the frontend:
    ```sh
    npm run dev
    ```

## Backend

### File Descriptions

#### Main Files
- `app.js`: Sets up the Express app, connects to the database, and defines the routes.
- `server.js`: Creates the HTTP server and initializes the socket connection.

#### Controllers
- `controllers/userController.js`: Handles user registration, login, profile retrieval, and logout.
- `controllers/captain.controller.js`: Handles captain registration, login, profile retrieval, and logout.
- `controllers/ride.controller.js`: Manages ride creation, fare calculation, ride confirmation, start, and completion.
- `controllers/maps.controller.js`: Provides map-related services such as address coordinates, distance and time calculation, and autocomplete suggestions.

#### Services
- `services/userService.js`: Contains business logic for user operations.
- `services/captainService.js`: Contains business logic for captain operations.
- `services/ride.service.js`: Contains business logic for ride operations including fare calculation and ride status updates.
- `services/maps.service.js`: Interacts with external map APIs to provide address coordinates, distance and time calculation, and autocomplete suggestions.

#### Models
- `models/userSchema.js`: Defines the schema for the user, including methods for password hashing and token generation.
- `models/captainModel.js`: Defines the schema for the captain, including methods for password hashing and token generation.
- `models/ride.schema.js`: Defines the schema for the ride, including fields for user, captain, pickup, destination, fare, status, distance, duration, and OTP.
- `models/blacklistToken.js`: Defines the schema for blacklisted tokens to manage logout functionality.

#### Middlewares
- `middlewares/auth.middleware.js`: Provides authentication middleware for users and captains, including token verification and blacklist checking.

#### Routes
- `routes/userRoutes.js`: Defines user-related routes for registration, login, profile retrieval, and logout.
- `routes/captain.routes.js`: Defines captain-related routes for registration, login, profile retrieval, and logout.
- `routes/ride.routes.js`: Defines ride-related routes for creating rides, calculating fare, confirming rides, starting rides, and completing rides.
- `routes/maps.routes.js`: Defines map-related routes for getting address coordinates, distance and time, and autocomplete suggestions.

#### Database
- `db/db.js`: Sets up the database connection using Mongoose.

#### Socket
- `socket.js`: Initializes the socket connection and handles events such as user and captain joining, updating captain location, and sending messages to specific socket IDs.

### API Endpoints

#### User Routes
- `POST /users/register`: Register a new user.
- `POST /users/login`: Login a user.
- `GET /users/profile`: Get user profile.
- `GET /users/logout`: Logout a user.

#### Captain Routes
- `POST /captain/register`: Register a new captain.
- `POST /captain/login`: Login a captain.
- `GET /captain/profile`: Get captain profile.
- `GET /captain/logout`: Logout a captain.

#### Ride Routes
- `POST /rides/create`: Create a new ride.
- `GET /rides/get-fare`: Get fare for a ride.
- `POST /rides/confirm`: Confirm a ride.
- `POST /rides/rideStarted`: Start a ride.
- `POST /rides/completeRide`: Complete a ride.

#### Map Routes
- `GET /maps/get-coordinates`: Get coordinates for an address.
- `GET /maps/get-distance-time`: Get distance and time between two locations.
- `GET /maps/get-suggestions`: Get autocomplete suggestions for an input.

## Frontend

### File Descriptions

#### Main Files
- `App.jsx`: Defines the main application component and sets up the routes using `react-router-dom`.
- `index.css`: Contains the global CSS styles for the application.
- `main.jsx`: Entry point for the React application, sets up the context providers and renders the `App` component.

#### Pages
- `pages/Home.jsx`: Home page component.
- `pages/userLogin.jsx`: User login page component.
- `pages/UserSignup.jsx`: User signup page component.
- `pages/captainSignUp.jsx`: Captain signup page component.
- `pages/captainLogin.jsx`: Captain login page component.
- `pages/HomePage.jsx`: User home page component.
- `pages/UserProtectWrapper.jsx`: Wrapper component to protect user routes.
- `pages/UserLogout.jsx`: User logout page component.
- `pages/CaptainHome.jsx`: Captain home page component.
- `pages/CaptainLogout.jsx`: Captain logout page component.
- `pages/CaptainProtectWrapper.jsx`: Wrapper component to protect captain routes.
- `pages/Riding.jsx`: User riding page component.
- `pages/CaptainRiding.jsx`: Captain riding page component.

#### Components
- `components/LiveTracking.jsx`: Component for live tracking using Google Maps.
- `components/DriverSearch.jsx`: Component for displaying driver search status.
- `components/ConfirmRide.jsx`: Component for confirming a ride.
- `components/CarsPanel.jsx`: Component for selecting a car type.
- `components/CaptainDetails.jsx`: Component for displaying captain details.
- `components/StartRide.jsx`: Component for starting a ride.
- `components/RidePopUp.jsx`: Component for displaying ride popup.
- `components/LocationSuggestions.jsx`: Component for displaying location suggestions.
- `components/LocationInput.jsx`: Component for inputting location details.

#### Context
- `context/UserContext.jsx`: Provides user data context.
- `context/CaptainContext.jsx`: Provides captain data context.
- `context/socketContext.jsx`: Provides socket context for real-time communication.

## License

This project is licensed under the MIT License.