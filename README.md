# Flix-flex - Node.Js API for Managing Movies and Series
## Welcome to Flix-flex, your go-to Node.js API for seamlessly managing movies and series. This comprehensive documentation outlines the functionalities, endpoints, and authentication features that empower your application with powerful movie and series management capabilities.

## Features
- Favorite Management: Users can manage their favorite movies and series.
- Search Capability: Functionality to search within the collection of movies and series.
- Trailer and details Access: Ability to access details and trailers for movies and series.

- ## Installation Requirements
To run the flix-flex project locally, ensure you have the following prerequisites:
- Node.js version 20
- Express framework

## Setup Instructions
Follow these steps to set up and run flix-flex locally:

1- Clone Repository:

```bash
git clone https://github.com/mohT4/FlixFlexMovies.git
cd flixFlexMovies
```
2- Set Up Environment Variables:


Duplicate the .env.example file  and name it .env

Then start the application using the following commands:
```bash
npm run dev
```
# About Fratures

## Authentication
Flix-flex provides a secure authentication system to manage user accounts. Users can perform the following actions:

- Sign Up: Create a new account.
- Log In: Access the API with their credentials.
- Forget Password: Easily reset their password.

## EndPoints 

- 1) Movie and Series Listing

## view all movies and series 
- Endpoints: /api/v1/movies , /api/v1/tvshows.
  
- Method: GET.
  
- Description: Retrieve the list of all available movies and series.

## Top 5 Rated Movies and Series:
- Endpoint: /api/v1/movies/top5rated, /api/v1/tvshows/top5tvshows.

- Method: GET.

- Description: Get the top 5 rated movies and series.

- 2) Favorites List 

## Add to Favorites:
- Endpoint: /api/v1/movies/favorites , /api/v1/tvshows/favorites.

- Method: POST.

- Description: Add a movie or series to the user's favorites list.

## Remove from Favorites:
- Endpoint: /api/v1/movies/favorites, /api/v1/tvshows/favorites.

- Method: DELETE.

- Description: Delete a movie or series from the user's favorites list.

## View Favorites List:
- Endpoint: /api/v1/movies/favorites, /api/v1/tvshows/favorites.

- Method: GET.

- Description: View the list of favorite movies and series.

- 3) Search

## Search Movies and Series:
- Endpoint: api/v1/movies/search, /api/v1/tvshows/search.

- Method: GET.

- Description: Search for movies and series.

## Search Movie and Series Details:
- Endpoint: api/v1/movies/search/:movieId/details, /api/v1/tvshows/search/:tvshowId/details.

- Method: GET.

- Description: Search for details of a specific movie or series.

## Search Movie and Series Trailers:
- Endpoint: api/v1/movies/search/:movieId/trailer, /api/v1/tvshows/search/:tvshowId/trailer.

- Method: GET.

- Description: Search for the trailer of a specific movie or series.

## Usage
The usage of the flix-flex API is thoroughly documented in Postman and Swagger.

Swagger: http://host:port/api .

[Postman Workspace] (https://app.getpostman.com/join-team?invite_code=6e01b033d57047b7c8f4a7f96301a7f2&target_code=3287c5b03914cb811e63f88b94678c2a)

