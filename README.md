# Board Game Collection API

A minimal REST API for managing a board game collection. This project demonstrates a layered architecture built with Express, TypeScript, Prisma, Passport, and SQL Server. The application is containerized with Docker and Docker Compose.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Docker Setup](#docker-setup)
- [Testing](#testing)
- [License](#license)

## Features

- User registration and login
- CRUD operations for board games
- Management of a user-specific board game collection
- Input validation using Zod
- Authentication using Passport
- RESTful API design

## Technologies

- **Node.js & TypeScript:** Provides a modern, strongly typed environment for server-side development.
- **Express:** Used to build REST API endpoints.
- **SQL Server:** The relational database used for data persistence.
- **Prisma:** An ORM that simplifies database interactions with type safety and migration management.
- **Passport:** Manages user authentication.
- **Zod:** Validates input data to ensure it meets the required schema.
- **Docker & Docker Compose:** Enable a containerized development and testing environment, making the project easier to configure, deploy, and share.
- **Jest & Supertest:**: Used for testing E2E the application apis to maintain code quality.

## Project Structure

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

## Installation

### Prerequisites

- Node.js (>=18)
- npm
- Docker and Docker Compose

### Local Setup

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

## Usage

The API will be available at http://localhost:3000. Use tools like Postman or Insomnia to test the endpoints.

### Available Endpoints

You can find complete list of apis docs on http://localhost:3000/api-docs after the application will run up.
