# Blog Analytics with Express and Lodash README

## Project Description

This whole projects consists of two middlewares through which the user can filter the blogs or get various statistics about them (all the blogs are fetched from an external server).

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Backend](#backend)

## Features

- User registration and authentication using JWT
- Create, read, update, and delete through Mongoose ORM 
- Users can put/delete their products and view their own products 
- Password encryption using bcrypt

## Technologies Used

- Node.js
- Express.js
- Lodash
- Axios
- Cors

## Prerequisites

- Node.js [Installation Guide](https://nodejs.org/)

## Installation

1. Clone the repository:

git clone 

2. Navigate to the project directory:

cd subspace

3. Install dependencies for the server (backend):

npm install 

4. Start the server:

npm start

## API Routes

- **GET /api/blog-stats**
  - Description: To get stats about the fetched blogs.

- **GET /api/blog-search**
  - Description: (Accepts a query parameter `query`) To filter the fetched blogs based on the query string.


## Usage 
- **GET /api/blog-stats**
  - Make a GET request to the above endpoint, it will give all the stats abouts the blogs 

- **GET /api/blog-search?query=privacy**
  - Make a GET request to the above endpoint along with `query` string in the url, it will fetch all the blogs which includes the `query` in their title   


## Backend 
Two specific middleware functions are created for routes `/api/blog-stats` and `/api/blog-search`
Custom error handler middleware are created for 404 error and all other errors.
Axios is used to call the external API to fetch the blogs 
