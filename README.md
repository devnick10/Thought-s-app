# Thought's Social Media App

Thought's is a social media application built with the MERN stack (MongoDB, Express, Node.js, EJS). This application allows users to create and manage posts, like and unlike posts, and handle user authentication and authorization.

## Features

- **User Authentication and Authorization**
  - Sign up and log in with JWT-based authentication.
  - Passwords are hashed using bcrypt.
- **Posts**
  - Create new posts.
  - Update existing posts.
  - Like and unlike posts.
- **Profile Management**
  - Add and update profile pictures (feature under development).

## Technologies Used

- **MongoDB**: Database for storing user and post data.
- **Express**: Backend framework for handling HTTP requests and routing.
- **Node.js**: JavaScript runtime for server-side development.
- **EJS**: Templating engine for server-side rendering.
- **JWT**: JSON Web Tokens for secure user authentication.
- **Bcrypt**: Library for hashing passwords.

## Project Structure

├── public

│ ├── images

│ ├── javascripts

│ └── stylesheets

├── routes

│ ├── index.js

│ └── users.js

├── views

│ ├── error.ejs

│ ├── index.ejs

│ ├── layout.ejs

│ └── profile.ejs

├── .env

├── app.js

├── package.json

└── README.md

## API Endpoints

### Authentication

- **POST /auth/signup**: Register a new user.
- **POST /auth/login**: Log in a user.

### Posts

- **POST /post**: Create a new post.
- **PUT /post/:id**: Update an existing post.
- **PUT /post/:id/like**: Like a post.
- **PUT /post/:id/unlike**: Unlike a post.

### Profile

- **POST /profile/picture**: Add or update profile picture (feature under development).

## Future Improvements

- Add and update profile pictures.
- Add comments on posts.
- Implement notifications.
- Improve the UI/UX of the application.

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request. We welcome all contributions!

## License

This project is licensed under the MIT License.
