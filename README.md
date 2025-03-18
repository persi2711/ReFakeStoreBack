# RefakeStore Nest Js by persi2711

This project is an API developed with NestJS, created as part of a backend development practice. It is inspired by the FakeStore website and API, providing features such as product and user management. The main objective of this project is to practice using NestJS, TypeORM, and database integration, simulating a basic online store.

## Features

- Data loading from API
- User registration and login
- Use of JWT authentication
- User identification through JWT
- Server-side pagination
- 169 products and 21 pages
- Cart and payment simulation
- Payment method management
- Shipping address management

## Tech Stack

**Server:** Nest Js, TypeOrm, Docker y JWT

**DataBase** PostgresSQL

**Documetation** Swagger

**Deployment** Railway, Github

**Versions** GitHub

## Installation

**Create DataBase with Docker**

```bash
  docker-compose up -d
```

**Project setup**

```bash
  npm install
```

**Compile and run the project**

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_PASSWORD`
`DB_NAME`
`DB_HOST`
`DB_PORT`
`DB_USERNAME`
`DB_LOAD_PASSWORD`
`JWT_SECRET`

## Documentation

Swagger Documentation http://localhost:3001/api#/

## Authors

- [@persi2711](https://github.com/persi2711)

## Contact

- [Linkedin](www.linkedin.com/in/emmanuel-antonio-rivera-lopez-persi2711)
- Mail: persi2711x2@gmail.com
