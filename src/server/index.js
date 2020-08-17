const tripData = []
//require express bodyParser and cors
var path = require('path')
const mockAPIResponse = require('./mockAPI.js')
const fetch = require("node-fetch");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
//start instance of express app
const app = express();
//bodyParser as a middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//cors for cross origin allowance
app.use(cors());
//initialize the main project folder
app.use(express.static('dist'));
// get route
app.get('/', (req, res) => {
    //res.status(200).send(projectData);
    res.sendFile('dist/index.html');
})
app.get('/test', function (req, res) {
  res.send(mockAPIResponse)
})
app.get('/getTrip', (req, res) => {
    res.status(200).send(tripData)
})
//http://api.geonames.org/searchJSON?q=london&maxRows=1&username=demo
//fetching data through geonames api
const GeoUsername = process.env.GEONAMES_USERNAME;
const GeoURL = process.env.GEONAMES_URL;

const fetchLatLng = async (destination) => {
    try {
      if (!destination) {
        // if user doesn't enter any destination
        throw 'please enter a destination'
      }
      const result = await fetch(
        `${GeoURL}q=${destination}&maxRows=1&username=${GeoUsername}`,// fetching lat and lng from Geonames using destination user entered
      )
      const {geonames: destinations} = await result.json()
      if (destinations.length > 0) {// for every destination
        const location = {
          location: `${destinations[0].name}`,// name of the destination
          lat: destinations[0].lat,//latitude of destination
          lng: destinations[0].lng//longitude of destination
        }
        return location
      }
      return {}
    } catch (e) {
      throw e
    }
  }


//https://api.weatherbit.io/v2.0/forecast/daily?lat=38.123&lon=-78.543&key=API_KEY
//weatherbit api
const weatherbitKey = process.env.WEATHERBIT_KEY;
const weatherbitURL = process.env.WEATHERBIT_URL;

const fetchWeather = async(lat, lng) => {
  try {
    const result = await fetch(`${weatherbitURL}lat=${lat}&lon=${lng}&key=${weatherbitKey}`)// fetching weather data using key, lat and lng from weatherbit
    const resultdata = await result.json()// storing JSON data we fetched in resultdata
    const finalData = resultdata.data[resultdata.data.length - 10] 
    const weatherData = {
      max_temp: finalData.max_temp,//max temp from JSON
      min_temp: finalData.min_temp,//min temp from JSON
      summary: finalData.weather.description//Summary from JSON
    }
    return weatherData
  } catch(e) {
    throw e
  }
}

//https://pixabay.com/api/?key={ KEY }&q=paris&image_type=photo&cat=travel
//pixabay 
const pixabaykey = process.env.PIXABAY_KEY
const pixabayURL = process.env.PIXABAY_URL
const fetchImage = async(destination) => {
  try{
    const result = await fetch(`${pixabayURL}key=${pixabaykey}&q=${destination}&category=travel`)// fetching image data using key and location from pixabay
    const data = await result.json()// storing JSON data we fetched in data 
    return data.hits[0].webformatURL// getting appropriate image URL 
    
  } catch(e) {
    throw e
  }
}

//get related destination data from appropriate API and post it
app.post('/postTrip', async (req, res) => {
    try {
      const destination = req.body.location // request for that location is stored
      const {lat, lng, location} = await fetchLatLng(destination)// have function to fetch lat and lng for the destination
      const weather = await fetchWeather(lat, lng)// have function to fetch weather data from lat and lng
      const picture = await fetchImage(location)//have funtion to fetch related image of th destination
      const trip = {
        location,
        weather,
        picture,
      }//trip will have the data from API's we needed
      tripData.push(trip)// data of trip in tripData array
      res.status(201).send()
    } catch (e) {
      console.log(e)
      res.sendStatus(404)
    }
  })

//server port set up and running
app.listen(9000, function () 
{ console.log('Example app listening on port 9000!') })


module.exports = app;