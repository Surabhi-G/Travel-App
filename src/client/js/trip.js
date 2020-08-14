//declaring globel variables
const date = document.getElementById('date');
const city = document.getElementById('city');
const generate = document.getElementById('generate');

//get date difference
const dateDiffer = (date) => {
  const date1 = new Date(date).getTime()
  const date2 = new Date().getTime()
  const data = Math.floor((date1 - date2) / (1000 * 60 * 60 * 24))
  return data
}

//get api data

const getTrips = async () => {
  try {
    const result = await fetch('http://localhost:9000/trips')
    const trips = await result.json()
    const day = dateDiffer(date.value)
    if (trips.length > 0) {
      trips.forEach(trip => {
        const {location, weather, picture} = trip
        document.getElementById('cityname').innerHTML = `${day} days to go for ${location}`
        document.getElementById('country').innerHTML = `${day} days to go for ${location}`
        document.getElementById('city_population').innerHTML = `${day} days to go for ${location}`
        document.getElementById('city_latitude').innerHTML = `${day} days to go for ${location}`
        document.getElementById('city_longitude').innerHTML = `${day} days to go for ${location}`
        document.getElementById('tmax').innerHTML = `maximum temprature = ${weather.max_temp}c`
        document.getElementById('tmin').innerHTML = `minimum temprature = ${weather.min_temp}c`
        document.getElementById('summary').innerHTML = `weather summary = ${weather.summary}`
        document.getElementById('picture').innerHTML = `<img src="${picture}">`
      })
    }
  } catch (e) {
    setError("We couldn't fetch your trips. Please try again later.")
  }
}

//fetch api using city name

const saveTrip = async (location) => {
  const result = await fetch('http://localhost:9000/trip/', {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({location}),
  })
  if (!result.ok) {
    console.log("We weren't able to save your trip. Please try again.")
  } else {
    getTrips()
  }
}

//eventlistener

function handleSubmit() { generate.addEventListener('click', ()=>{
  saveTrip(city.value);
})
}

handleSubmit();
export {handleSubmit}