// globel variables
const date = document.getElementById('date');
const end_date = document.getElementById('end_date');
const city = document.getElementById('city');
const generate = document.getElementById('generate');

//getting days left from today's date 
const daysLeft = (date) => {
  const date1 = new Date(date).getTime()
  const date2 = new Date().getTime()
  const data = Math.floor((date1 - date2) / (1000 * 60 * 60 * 24))
  return data
}
//total number of vacation days
const tripDays = (date, end_date) => {
  const date3 = new Date(date).getTime()
  const date4 = new Date(end_date).getTime()
  const data2 = Math.floor((date4 - date3) / (1000 * 60 * 60 * 24))
  return data2
}

//Getting data from all three API and placing it to according HTML tags

const getTrips = async () => {
  try {
    const result = await fetch('http://localhost:9000/trips')
    const trips = await result.json()
    const countDown = daysLeft(date.value)
    const vacationDays = tripDays(date.value,end_date.value)
    if(vacationDays > 0){
    if (trips.length > 0) {
      trips.forEach(trip => {
        const {location, weather, picture} = trip
        document.getElementById('cityname').innerHTML = `${countDown} days left for ${vacationDays} days long trip to ${location}`
        document.getElementById('max_temp').innerHTML = `Current maximum temprature in ${location} is ${weather.max_temp}C`
        document.getElementById('min_temp').innerHTML = `Current minimum temprature in ${location} is ${weather.min_temp}C`
        document.getElementById('summary').innerHTML = `Today there is ${weather.summary} in ${location}`
        document.getElementById('picture').innerHTML = `<img src="${picture}">`
      })
    }
    }
    else{
      alert('Starting date should be before ending date.')
    }
  } 
  catch (e) {
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
