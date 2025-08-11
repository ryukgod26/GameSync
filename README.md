# GameSync API
This is a small project created by me.This is a robust backend Api for gamers.They can add games in their profiles in different catofries like Games they have Completed, Games They are Playing and Games they have Dropped. This Project as the Complete Server side logic for the Application.You can Easily build apps or Websites with this Api.(One more Thing I have never Wrote a Readme File before So Please Igmore mistakes in Readme File)

---

## Tabel of Contents
- [About the Project](#about-the-project)
- [Key Features](#key-features)
- [Built With](#built-with)
- [Getting Started](#getting-started)
    - [Installation](#installation)
- [API Endpoints](#api-endpoints)
    - [Unauthenticated Routes](#unauthenticated-routes)
    - [Authentication](#authentication)
    - [Users and Profiles](#user-profiles)
    - [Followers and Following](#followers-following)
- [Error Handling](#error-handling)

---

## About the Project
This Api provides the core Infrastructure for a social Application or website for Gamers. It handles user Registeration,Login(with JsonWebToken),Profile Management,Games Lists and the ability of users to follow and unfollow each other.It is built with nodejs and expressjs.

---

## Key Features
- **User Authentication:** Secure User Registration with Password hashing using bcrypt and login  Authentication with jwt(JsonWebToken).
- **Protected Routes:** Middleware to Protect Routes which requires user to be Authenticated First.
- **Follow and Unfollow Feature:** Users can follow and unfollow other users on the Platform.
- **Profile Management:** Users can view and update their profiles.They can also view other Usesr Profiles.
**Scalable Structure:** Organized into routes,controllers, and models for easy Maintainance.

---

## Built With

-   [Node.js](https://nodejs.org/) 
-   [Express.js](https://expressjs.com/) 
-   [MongoDB](https://www.mongodb.com/) 
-   [Mongoose](https://mongoosejs.com/)
-   [JSON Web Token (jsonwebtoken)](https://github.com/auth0/node-jsonwebtoken) 
-   [bcryptjs](https://github.com/dcodeI0/bcrypt.js)

---

## Getting Started

To Run this Api on your Local Machine, Follow these Steps

### Installation

1.  **Clone the repository** 
``` sh
 git clone [https://github.com/ryukgod26/GameSync.git](https://github.com/ryukgod26/GameSync.git)
```
2.  **Navigate into Project Folder**
```sh 
cd GameSync
```
3.  **Install npm Packages** 
``` sh
npm install
```
4.  **Create a .env File:** Go to root directory of the Project and create a new .env file.
5.  **Configuring .env file:** 
``` env 
MONGO_URI = <Your Mongodv Database URI>
JWT_SECRET_KEY = <Your Jwt Secret Key>
```
6.  **Start the server(for Development):** For Development
``` sh
nodemon
```
7.  **Start the server (For Production)** 
``` sh
node app.js
```
---

## API Endpoints

### Unauthenticated Routes
Public endpoints that do not require authentication.

- GET https://gamesync-vui5.onrender.com/
    - Description: Plain text description of the API.

- GET https://gamesync-vui5.onrender.com/users/
    - Description: Returns an array of all usernames.
    - Response: ["user1", "user2", ...]

- GET https://gamesync-vui5.onrender.com/users/search/:username/
    - Path params: username (string)
    - Description: Basic profile info for a user.
    - Success response: { name, username, "Games Completed": [ids], followersCount, followingCount }
    - 404 when user not found.

- POST https://gamesync-vui5.onrender.com/users/register/
    - Body: { username, name, email, password } (password must be at least 6 chars)
    - Success: 201 { message: "User Saved Successfully." }
    - Errors: 409 if email/username exists. validation message if fields missing.

- POST https://gamesync-vui5.onrender.com/users/login/
    - Body: { username, password }
    - Success: { jwtToken } (expires in ~30 minutes)
    - Errors: messages for wrong username/password.

- GET https://gamesync-vui5.onrender.com/games/
    - Description: Returns an array of all game titles.
    - Response: ["Halo", "Elden Ring", ...]

- GET https://gamesync-vui5.onrender.com/games/game/?genre=... OR ?title=...
    - Query (case-insensitive): genre (string) to get an array of games, or title (string) to get a single game object.
    - Response: genre -> Game[], title -> Game | null


### AUTHENTICATED ROUTES
These endpoints require a valid JWT. It means you have to login first before you can access these routes.

- Authorization header: set to your raw JWT token (no "Bearer " prefix). Note: the current middleware expects the token value directly.

- GET https://gamesync-vui5.onrender.com/users/profile/
    - Description: Returns the authenticated user's profile.
    - Response fields: username, name, email, "Games Completed", "Games Playing", "Games Dropped", "Number of Followers", "Number of Following".

- POST https://gamesync-vui5.onrender.com/users/:username/follow/
    - Path params: username (string)
    - Description: Follow another user on the platform.

- DELETE https://gamesync-vui5.onrender.com/users/:username/unfollow/
    - Path params: username (string)
    - Description: Unfollow another user on the platform.

- GET https://gamesync-vui5.onrender.com/users/profile/followers/
    - Description: List of your followers' usernames.
    - Response: { "Usernames of followers": ["alice", "bob", ...] }

- GET https://gamesync-vui5.onrender.com/users/profile/following/
    - Description: List of usernames you are following.
    - Response: { "Usernames of following": ["carol", ...] }

- PUT https://gamesync-vui5.onrender.com/games/add/gamesCompleted/
    - Body: { title } (string; case-insensitive match)
    - Description: Adds the game to your "Games Completed" list. Removes it from "Games Playing" and "Games Dropped" if present.

- PUT https://gamesync-vui5.onrender.com/games/add/gamesPlaying/
    - Body: { title } (string; case-insensitive match)
    - Description: Adds the game to your "Games Playing" list. Removes it from "Games Completed" and "Games Dropped" if present.

- DELETE https://gamesync-vui5.onrender.com/games/delete/gamesDropped/:title
    - Path params: title (string; case-insensitive match)
    - Description: Adds the game to your "Games Dropped" list. Also removes it from "Games Playing" and "Games Completed" if present. Note: despite using the DELETE method, this route acts as a move-to-dropped operation.


