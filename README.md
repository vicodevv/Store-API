# STORE API

This is a REST API for a store. It allows users to register, login, create, update, delete and get products. This API is built with NodeJS, NestJS and MongoDB.

## Technologies

This API was developed with the following technologies:

- NodeJS
- NestJS
- MongoDB

## Getting Started

Pre-requisites

- Node(LTS version)
- NPM v9.0.0 or higher
- MongoDB

You can get the latest version of NodeJS from [here](https://nodejs.org/en/download/) or you can check the version you have installed on your machine by running the following command in your terminal

```bash
  node -v
```

You can get the latest version of NPM from [here](https://www.npmjs.com/get-npm) or you can check the version you have installed on your machine by running the following command in your terminal

```bash
  npm -v
```

## Installation

Clone the project

```bash
  git clone git@github.com:vicodevv/Store-API.git
```

Go to the project directory

```bash
  cd Store-API
```

Install dependencies

```bash
  npm install
```

Run the code

```bash
  npm run start:dev
```

## Entity Relationship Diagram

## Authentication

This API uses JWT for authentication. To get a token, you need to register and login. The token is valid for 24 hours. You can use the token to access protected routes. To access authenticated routes, set your authorization header to Bearer [ token ]. Read postman documentation for further details

## Postman Documentation

## Live Link

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

- PORT=your port number
- MONGODB_URI=your mongodb uri
- JWT_SECRET=your jwt secret

## API Reference

| Method | Description          | Endpoints        |
| :----- | :------------------- | :--------------- |
| POST   | Login a user         | /auth/login      |
| POST   | Register a user      | /auth/register   |
| POST   | Create a product     | /products/create |
| GET    | Get all products     | /products/all    |
| GET    | Get a single product | /products/:id    |
| DELETE | Delete a product     | /products/:id    |

## Authors

- [@vicodevv](https://www.github.com/vicodevv)

## License

[MIT](https://choosealicense.com/licenses/mit/)
