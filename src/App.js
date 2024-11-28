import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Add your custom CSS here

const App = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('Toronto');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch weather data from OpenWeatherMap API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5cad106a75915ec8f479e836d05161ad`
        );
        setWeather(response.data);
        
      } catch (err) {
        setError('Error fetching weather data');
      }
      setLoading(false);
    };
    fetchData();
  }, [city]);

  // Handle city change input
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  // Convert Kelvin to Celsius
  const kelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(1);
  };

  // Create the weather icon URL
  const getIconUrl = (icon) => {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
  };

  console.log(weather);

  return (
    <div className="App">
      <h1>Weather App</h1>
      <div>
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city"
          className="city-input"
        />
      </div>

      {loading && <p>Loading...</p>}


      {error && <p>{error}</p>}

      {weather && (
        <div className="weather-info">
          <h2 className="cityName">{weather.name}</h2>
          <img src={getIconUrl(weather.weather[0].icon)} alt="Weather Icon" />
          <p>{weather.weather[0].description}</p>
          <p>{kelvinToCelsius(weather.main.temp)}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default App;
