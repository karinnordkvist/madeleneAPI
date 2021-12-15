# Mongo API Project

The aim of the project was to learn how to use Mongodb to store data, model data, return error messages and fetch items from a Mongo database using Mongoose. The API is built with Node on Express and the aim of the enpoints is to follow RESTful standards.

## Documentation

GET /
Welcome page

GET /shows
Displays all 1375 netflix titles in the dataset.

----Query Params----

GET /shows?type=

Filters the dataset by type

GET /shows?country=

Filters the dataset by country

GET /shows?release_year=

Filters the dataset by release year

GET /shows?director=

Filters the dataset by director

GET /shows/title/:title

Displays a netflix title based on the title parameter from the request URL.

GET /shows/id/:id

Displays a netflix title based on the unique id parameter. An error message will show if no titles are found by that id

## View it live
