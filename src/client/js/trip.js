  // global variables

  const date = document.getElementById('date');
  const end_date = document.getElementById('end_date');
  const destination = document.getElementById('destination');
  const generate = document.getElementById('generate');

  //getting days left from today's date 
  const daysLeft = (date) => {
  const date1 = new Date(date).getTime()
  const date2 = new Date().getTime()
  const daysleft = Math.floor((date1 - date2) / (1000 * 60 * 60 * 24))
  return daysleft
  }
  //total number of vacation days
  const tripDays = (date, end_date) => {//counts days between starting and ending date
  const date3 = new Date(date).getTime()
  const date4 = new Date(end_date).getTime()
  const tripDays = Math.floor((date4 - date3) / (1000 * 60 * 60 * 24))
  return tripDays
  }

  //Getting data from all three API and placing it to according HTML tags

  const getTrips = async () => {
  try {
    const result = await fetch('http://localhost:9000/getTrip') //fetching the data
    const trips = await result.json() // trips will store the data we fetched
    const countDown = daysLeft(date.value)// count the days left to start our journey from current date
    const vacationDays = tripDays(date.value,end_date.value)// count the days we will be on trip
    if(vacationDays > 0){//if user enters proper dates for starting and ending of trip
      if (trips.length > 0) {// if there is any trip
        trips.forEach(trip => {
        const {location, weather, picture} = trip
        document.getElementById('destinationname').innerHTML = `${countDown} days left for ${vacationDays} days long trip to ${location}`
        document.getElementById('max_temp').innerHTML = `Within a week maximum temprature in ${location} will be ${weather.max_temp}C`
        document.getElementById('min_temp').innerHTML = `Within a week minimum temprature in ${location} will be ${weather.min_temp}C`
        document.getElementById('summary').innerHTML = `In next week there will be ${weather.summary} in ${location}`
        document.getElementById('picture').innerHTML = `<img src="${picture}">`
        })
      }
    }
    else{//if user enters incorrect dates for their trip
      alert('Starting date should be before ending date.')
    }
  } 
  catch (e) {// if there is not any trip
    setError("Hmmm... it seems you haven't create any trip!")
    }

  }

  //fetch api using destination name

  const myTrip = async (location) => {
    const result = await fetch('http://localhost:9000/postTrip/', {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({location}),
  })
    if (!result.ok) {//if there is no trip then no data to post
    console.log("We couldn't fetch your trip data. Please try again.")
    } else {//fetch created trip data and post
    getTrips()
    }
  }

  //added eventlistener when user click on generate button
  
  function handleSubmit() { 
  generate.addEventListener('click', ()=>{
  myTrip(destination.value);
  })
  }
handleSubmit();

export {handleSubmit}
