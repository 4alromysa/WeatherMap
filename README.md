# WeatherMap

This is my WeatherMap project 

Name: الرميصاس حسن محمد علي الشامي - قسم هندسة برمحيات

## About the project

WeatherMap is a single page web app. You type the name of a city, and the app shows the current weather of that city in a popup on an interactive map. The page does not reload.

## How it works

1. The map starts on Khartoum, Sudan.
2. I type a city name and click **Get Weather**.
3. The app finds the city location using the Nominatim API.
4. The app gets the weather from the OpenWeatherMap API.
5. The map moves to the city and puts a marker on it.
6. A popup shows the city name, temperature, clouds, humidity, wind speed and the weather icon.
7. I can click **Share Weather** in the popup to share the weather or copy it.

## What I used

- HTML, CSS and JavaScript in separate files
- Leaflet.js with OpenStreetMap
- OpenStreetMap Nominatim API
- OpenWeatherMap API

## Features

- Interactive map
- City search without reloading the page
- Weather popup on the map
- Loading spinner
- Error cards for problems like city not found or no internet
- Share Weather button
- Works on phones and computers

## How to run

1. Open the project folder in VS Code.
2. Install the Live Server extension.
3. Right click `index.html` and choose **Open with Live Server**.


