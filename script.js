

// This is my OpenWeatherMap API key
const WEATHER_API_KEY = "738ee839a89d1d8503c9010d3134174e";


let map;

// This keeps the current marker so we can remove it before adding a new one
let currentMarker;

/* This function creates the map and displays it on the page */
function initializeMap() {
   map = L.map("map").setView([15.5007, 32.5599], 6);

    // This adds the map tiles from OpenStreetMap
 L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

}

// This calls the function to show the map
initializeMap();


/* This function gets the coordinates of the city from the API */
async function getCityCoordinates(city) {

    // This prepares the city name for the API link
    const cityName = encodeURIComponent(city);

    // This sends a request to search for the city
    const response = await fetch(
        `https://nominatim.openstreetmap.org/search?city=${cityName}&format=json&limit=1`
    );

    // This checks if the request failed
    if (!response.ok) {
        throw new Error("Could not search for the city");
    }

    // This converts the API response into JavaScript data
    const data = await response.json();

    // This checks if the city was not found
    if (data.length === 0) {
        throw new Error("City not found");
    }

    // This returns the latitude and longitude
    return {
        lat: Number(data[0].lat),
        lon: Number(data[0].lon)
    };
}


/* This function gets the current weather for a place from OpenWeatherMap */
async function getWeather(lat, lon) {

    // This sends a request with the coordinates and our API key
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`
    );

    // This checks if the request failed
    if (!response.ok) {
        throw new Error("Could not get the weather");
    }

    // This converts the response into JavaScript data and returns it
    return await response.json();
}

/* This function puts a marker on the map and shows the weather in a popup */
function showWeatherOnMap(lat, lon, weather) {

    // This removes the old marker if there is one
    if (currentMarker) {
        map.removeLayer(currentMarker);
    }

    // This builds the HTML that will appear inside the popup
    const popupContent = `
        <h3>${weather.name}</h3>
        <img src="https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png" alt="weather icon">
        <p>Temperature: ${Math.round(weather.main.temp)}°C</p>
        <p>${weather.weather[0].description}</p>
        <p>Clouds: ${weather.clouds.all}%</p>
        <p>Humidity: ${weather.main.humidity}%</p>
        <p>Wind: ${weather.wind.speed} m/s</p>
    `;

    // This adds the new marker, connects the popup to it, and opens it
    currentMarker = L.marker([lat, lon]).addTo(map);
    currentMarker.bindPopup(popupContent).openPopup();
}




























/* This function searches for a city, gets its weather, and shows it on the map */
async function handleCitySearch(event) {

    // This stops the page from refreshing
    event.preventDefault();

    // This gets the city name from the search input
    const city = document.getElementById("city-input").value.trim();

    try {
        // This gets the coordinates of the city
        const coordinates = await getCityCoordinates(city);

        // This gets the weather using those coordinates
        const weather = await getWeather(coordinates.lat, coordinates.lon);

        // This moves the map smoothly to the city
        map.flyTo([coordinates.lat, coordinates.lon], 10);

        // This shows the marker and the weather popup
        showWeatherOnMap(coordinates.lat, coordinates.lon, weather);

    } catch (error) {
        // This shows a message if something fails
        alert(error.message);
    }
}



// This finds the search form in HTML
const weatherForm = document.getElementById("weather-form");

// This runs the search function when the form is submitted
weatherForm.addEventListener("submit", handleCitySearch);
