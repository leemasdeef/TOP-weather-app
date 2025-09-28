// get weather based off location from visual crossing weather api
async function getWeather(location) {
   const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=HPTMR7L9TBXHLTCJCLR5K63DP`;


   try {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error (`Response received: ${response.status}`)
    }

    const result = await response.json();
    console.log(result);
    return result;
   } catch (error) {
    console.log(error.message);
   }
}

// read json file to extract relevant weather details
async function readJson(location) {
    const result = await getWeather(location)
    const weatherObject = {
        location: result.timezone,
        conditions: result.currentConditions.conditions,
        temperature: result.currentConditions.temp,
        feelsLike: result.currentConditions.feelslike,
        windSpeed: result.currentConditions.windspeed,
        humidity: result.currentConditions.humidity,
    };
    console.log(weatherObject);
    return weatherObject;
}

async function renderScreen(location) {
    const weatherContainer = document.querySelector(".weather-container");
    const mainInfoDiv = document.querySelector(".main-info");
    const detailedInfoDiv = document.querySelector(".detailed-info");
    
    const result = await readJson(location);
    mainInfoDiv.innerHTML = `
    <h1>${result.location}</h1>
    <p>${result.conditions}<p>
    <span class="temperature">${result.temperature} F</span>
    `;
    detailedInfoDiv.innerHTML = `
    <p>Feels like: ${result.feelsLike} F</p>
    <p>Humidity: ${result.feelsLike}%</p>
    <p>Wind: ${result.windSpeed} mph</p>
    `;
    
};
    

const searchForm = document.getElementById("search");
const locationInput = document.getElementById("location-input")
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    renderScreen(locationInput.value)
} )