# Board Game Collection API

A minimal REST API for managing a board game collection. This project demonstrates a layered architecture built with Express, TypeScript, Prisma, Passport, and SQL Server. The application is containerized with Docker and Docker Compose.

## 📑 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Docker Setup](#docker-setup)
- [Usage](#usage)
- [License](#license)

## 📖 Project Overview

The Board Game Collection API is designed to provide a robust backend for managing board game collections in a scalable and maintainable way. The project leverages several proven design patterns and best practices to ensure clean separation of concerns and ease of maintenance:

- **Layered Architecture**: The project is divided into distinct layers (controllers, services, repositories) to separate business logic, data access, and presentation.
- **Repository Pattern**: Used in the repositories layer to abstract data access, making it easier to manage database operations and swap implementations if needed.
- **Service Layer Pattern**: Business logic is encapsulated in the services layer, providing a clean interface between the controllers and the underlying data sources.
- **Middleware Pattern**: Custom middlewares are implemented to handle common tasks such as error handling and validation, keeping the code modular and reusable.
- **Validation Pattern with Zod**: Ensures that input data adheres to defined schemas before processing, enhancing the overall robustness of the API.

## ⚙️ Features

- User registration and login
- CRUD operations for board games
- Management of a user-specific board game collection
- Input validation using Zod
- Authentication using Passport
- RESTful API design

## 💻 Technologies

- **Node.js & TypeScript:** Provides a modern, strongly typed environment for server-side development.
- **Express:** Used to build REST API endpoints.
- **SQL Server:** The relational database used for data persistence.
- **Prisma:** An ORM that simplifies database interactions with type safety and migration management.
- **Passport:** Manages user authentication.
- **Zod:** Validates input data to ensure it meets the required schema.
- **Docker & Docker Compose:** Enable a containerized development and testing environment, making the project easier to configure, deploy, and share.
- **Jest & Supertest:**: Used for end-to-end testing of the application APIs to maintain code quality.
- **Swagger**: Used for writing API documentation.

## 🗂 Project Structure

```plaintext
├── src
│   ├── config         # Configuration files (database, authentication, etc.)
│   ├── controllers    # Express route handlers
│   ├── middlewares    # Custom middleware (error handling, validation, etc.)
│   ├── repositories   # Data access layer (Repository Pattern)
│   ├── routes         # Express routes
│   ├── services       # Business logic services
│   ├── validators     # Zod schemas for input validation
│   └── index.ts       # Application entry point
├── prisma             # Prisma schema and migration files
├── Dockerfile         # Docker configuration for building the image
├── docker-compose.yml # Docker Compose configuration
├── package.json       # Project dependencies and scripts
├── tsconfig.json      # TypeScript configuration
└── README.md          # Project documentation
```

Below is the ER diagram:<br>
<img src="./app_erd.svg" alt="Image not found." width="200">

## 📦 Installation

### 📋 Prerequisites

- Node.js (>=18)
- npm
- Docker and Docker Compose

### 🛠️ Local Setup

1. **Clone the repository:**

   ```bash
   git clone <repository_url>
   cd <repository_directory>
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables: Create a .env file in the root directory with variables such as:**

   ```env
   DATABASE_URL="sqlserver://sa:YourStrong@Passw0rd@localhost:1433;database=boardgames;encrypt=true;trustServerCertificate=true"
   PORT=3000 # Default in the code 3000 if not setted
   ```

4. **Run Prisma migrations and generate the client:**

   ```bash
   npx prisma generate
   ```

5. Start the application:

   ```bash
   npm run start
   ```

6. The project includes end-to-end tests to ensure code quality. Run the tests using:

   ```bash
   npm run test
   ```

### 🐳 Docker Setup

To run the application in a containerized environment, use Docker Compose:

```bash
docker-compose up --build
```

This command will build the Docker image and start the containerized environment with the necessary services (e.g., API, database).

## ▶️ Usage

The API will be available at http://localhost:3000. Use tools like Postman or Insomnia to test the endpoints.

### 🔌 API Documentation

You can find complete list of apis docs on http://localhost:3000/api-docs after the application will run up.

## 📜 License

This project is not licensed.
