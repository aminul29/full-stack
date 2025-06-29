document.addEventListener("DOMContentLoaded", function () {
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");
  
  
    const API_KEY = "daecabee44f53007d8917e7fe147dcd1";
  
  
    getWeatherBtn.addEventListener("click", async function () {
      const city = cityInput.value.trim();
      if (!city) return; // If the input is empty, do nothing
      // it may throw an error
      // server is always in another continent
      try {
        // Try to fetch and display the weather data
        const weatherData = await fetchWeatherData(city);
        displayWeatherData(weatherData);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        showError();
      }
    });
  
  
    async function fetchWeatherData(city) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;  
  
      const response = await fetch(url);  
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }  
  
      const data = await response.json(); // convert the response to JSON
      return data; // return the data
    }
  
  
    function displayWeatherData(data) {  
  
      const { main, weather, name } = data; // Destructure the data object to get main, weather, and name properties  
  
      cityNameDisplay.textContent = name; // Display the city name in the HTML element
      temperatureDisplay.textContent = `Temperature: ${main.temp} °C`; // Display the temperature in Celsius
      descriptionDisplay.textContent = `Weather: ${weather[0].main}`; // Display the weather descriptionweather[0].description; // Display the weather description  
  
      weatherInfo.classList.remove("hidden"); // Show the weather info section
      errorMessage.classList.add("hidden"); // Hide the error message if it was previously shown
    }  
  
    function showError() {
      weatherInfo.classList.add("hidden");
      errorMessage.classList.remove("hidden");
    }

  });
  