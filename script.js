
let map;

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


























/* This function searches for a city and moves the map to it */
async function handleCitySearch(event) {

    // This stops the page from refreshing
    event.preventDefault();

    // This gets the city name from the search input
    const city = document.getElementById("city-input").value.trim();

    try {
        // This gets the coordinates of the city
        const coordinates = await getCityCoordinates(city);

        // This moves the map to the selected city
        map.setView([coordinates.lat, coordinates.lon], 10);

    } catch (error) {
        // This shows a message if the search fails
        alert(error.message);
    }
}



// This finds the search form in HTML
const weatherForm = document.getElementById("weather-form");

// This runs the search function when the form is submitted
weatherForm.addEventListener("submit", handleCitySearch);
