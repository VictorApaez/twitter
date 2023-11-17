# Twitter Clone Backend

## Overview

This is the backend for the Twitter Clone app, designed to handle authentication, data storage, and server-side logic. Built using Node.js and Apollo Server, it integrates GraphQL for efficient data querying and manipulation. The backend manages models for users, posts, and comments, and supports both PostgreSQL for production and SQLite for testing environments.

<img width="1435" alt="twitter-backend" src="https://github.com/VictorApaez/twitter/assets/56009643/6889e12e-8294-4c20-bbbf-11dbb35751e7">

## Features

- **GraphQL API:** Developed using Apollo Server to handle queries and mutations related to users, posts, and comments.
- **Sequelize ORM:** Models for users, posts, and comments are built using Sequelize, ensuring a structured and scalable database design.
- **Authentication:** Implemented JWT authentication with Auth0 for secure user verification.
- **Test-Driven Development (TDD):** Applied TDD principles for developing models and GraphQL resolvers, ensuring reliability and maintainability of the code.
- **Database Support:** Configured to use PostgreSQL in production and SQLite for testing, ensuring flexibility and ease of testing.

## Technology Stack

- **Node.js & Express:** For creating the server-side application.
- **Apollo Server & GraphQL:** For building a flexible and efficient API.
- **Sequelize ORM:** For database modeling and interaction.
- **JWT & Auth0:** For secure authentication mechanisms.
- **PostgreSQL & SQLite:** As primary and test databases respectively.
- **Jest:** For running tests following TDD principles.
- **Dotenv:** To manage environment variables.

## Running the Project

1. **Clone the repository:**
   ```bash
    git clone https://github.com/VictorApaez/twitter
   ```
2. **Install dependencies:**
   ```bash
    npm install
   ```
3. **Run the development server:**
   ```bash
    npm start
   ```
 3. **Run tests:**
   ```bash
    npm test
   ```


## Contributing
Contributions are welcome! If you would like to contribute, please fork the repository and create a new branch for your feature. Once you have made your changes, submit a pull request and we will review your changes.

## License
This project is licensed under the MIT license.


