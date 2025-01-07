## File Descriptions

- `app.js`: Main application file that sets up the Express app and connects to the database.
- `controllers/userController.js`: Contains user-related controller functions such as `registerUser` and `loginUser`.
- `db/db.js`: Database connection setup using Mongoose.
- `models/userSchema.js`: Mongoose schema for the user, including methods for password hashing and token generation.
- `routes/userRoutes.js`: User-related routes for registration and login.
- `server.js`: Server setup and configuration.
- `services/userService.js`: Contains business logic for user operations.

## API Endpoints


### User Routes

- `POST /users/register`: Register a new user.
- `POST /users/login`: Login a user.

## License

This project is licensed under the MIT License.