import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Perumbavoor");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to get the current day and formatted date
  const getCurrentDate = () => {
    const currentDate = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const day = days[currentDate.getDay()];
    const date = currentDate.getDate();
    const month = months[currentDate.getMonth()];
    return `${day}, ${month} ${date}`;
  };


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
        setError("Error fetching weather data");
      }
      setLoading(false);
    };
    fetchData();
  }, [city]);


  const kelvinToCelsius = (kelvin) => (kelvin - 273.15).toFixed(1);

  /// just to make it look beautiful fake data

  const weeklyForecast = [
    { day: "Mon", temp: "27", icon: "01d" },
    { day: "Tue", temp: "23", icon: "09d" },
    { day: "Wed", temp: "27", icon: "02d" },
    { day: "Thu", temp: "31", icon: "01d" },
    { day: "Fri", temp: "32", icon: "04d" },
  ];

  
  const getIconUrl = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className="App">
      <h1>Weather Forecast</h1>
      <div>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="city-input"
        />
      </div>

      {weather && (
        <div className="weather-info">
          <div className="current-weather">
            <div className="left">
              <h2>{getCurrentDate()}</h2>
              <p>{city}</p>
              <h1>{kelvinToCelsius(weather.main.temp)}°C</h1>
              <p>{weather.weather[0].description}</p>
            </div>
            <div className="right">
              <p>Predictability: 71%</p>
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Wind: {weather.wind.speed} m/s</p>
              <p>Air Pressure: {weather.main.pressure} mb</p>
              <p>Max Temp: {kelvinToCelsius(weather.main.temp_max)}°C</p>
              <p>Min Temp: {kelvinToCelsius(weather.main.temp_min)}°C</p>
            </div>
          </div>

          <div className="weekly-forecast">
            {weeklyForecast.map((day, index) => (
              <div key={index} className="forecast-day">
                <p className="day">{day.day}</p>
                <img src={getIconUrl(day.icon)} alt="weather icon" />
                <p className="temp">{day.temp}°</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
