# Travel-App
A travel application, which pulls in multiple types of data, from different sources and one API will be required to get data from another API.

Description
------------------------------------------------------------
This is a Travel app which uses the Geonames API, Weatherbit API and Pixabay API to get the appropriate data using user entered information. It uses the Geoname api to get the latitude and longitude from entered destination name. Those Latitude and Longitude are used for weatherbit api to get weather data. Pixabay API is used to fetch the image of user entered destination.

How to run the App
-----------------------------------------------------------
Git clone the project/ download the project
Open it in your preferred editor

Create a .env file which has:-

GEONAMES_USERNAME (this will be geonames username),

GEONAMES_URL (http://api.geonames.org/searchJSON?),

WEATHERBIT_KEY (this will be Weatherbit key),

WEATHERBIT_URL (https://api.weatherbit.io/v2.0/forecast/daily?), 

PIXABAY_KEY (this will be Pixabay key),

PIXABAY_URL (https://pixabay.com/api/?) 

npm install to download all the dependencies
npm run build-dev to get it start
npm start to start the express server
npm start:dev to start the dev server

Technologies used
----------------------------------------------------------------
HTML5
CSS3
JavaScript
Express
Node
Webpack
