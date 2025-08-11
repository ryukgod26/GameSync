# GameSync API
This is a small project created by me.This is a robust backend Api for gamers.They can add games in their profiles in different catofries like Games they have Completed, Games They are Playing and Games they have Dropped. This Project as the Complete Server side logic for the Application.You can Easily build apps or Websites with this Api.(One more Thing I have never Wrote a Readme File before So Please Igmore mistakes in Readme File)

---

## Tabel of Contents
-[About the Project](#about-the-project)
-[Key Features](#key-features)
-[Built With](#built-with)
-[Getting Started](#getting-started)
    -[Installation](#installation)
-[API Endpoints](#api-endpoints)
    -[Authentication](#authentication)
    -[Users and Profiles](#user-profiles)
    -[Followers and Following](#followers-following)
-[Error Handling](#error-handling)

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
-   [bcryptjs](https://github.com/dcodeI0 /bcrypt.js)

---

## Getting Started

To Run this Api on your Local Machine, Follow these Steps

### Installation

1.** Clone the repository:** ``` sh
 git clone [https://github.com/ryukgod26/GameSync.git](https://github.com/ryukgod26/GameSync.git)
```
 Make Sure you have mongodb running locally or on cloud and node version (24.5.0) or later installed.
2.**Navigate into Project Folder:** ```sh cd GameSync```
3.**Install npm Packages:** ``` sh
npm install
```
4.**Create a .env File:** Go to root directory of the Project and create a new .env file.
5.**Configuring .env file:** ``` env 
MONGO_URI = <Your Mongodv Database URI>
JWT_SECRET_KEY = <Your Jwt Secret Key>
```
5.**Start the server:** For Development``` sh
nodemon
```
For Production ``` sh
node app.js
```

