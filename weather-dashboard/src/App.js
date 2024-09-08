import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const API_KEY = 'fe37b4385151e85658161f4c1351e6e7'; // Replace with your actual OpenWeatherMap API key

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const getWeatherData = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
      setError(''); // Clear previous error if any
    } catch (err) {
      setError('City not found. Please try again.');
      setWeatherData(null); // Clear weather data on error
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city) {
      getWeatherData(city);
    }
  };

  // Function to get background style based on weather condition
  const getBackgroundStyle = () => {
    if (!weatherData) return {};
    
    const weatherCondition = weatherData.weather[0].main.toLowerCase();
    let background = '';

    switch (weatherCondition) {
      case 'clear':
        background = 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'; // Sunny
        break;
      case 'clouds':
        background = 'linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)'; // Cloudy
        break;
      case 'rain':
      case 'drizzle':
        background = 'linear-gradient(135deg, #7f8c8d 0%, #34495e 100%)'; // Rainy
        break;
      case 'snow':
        background = 'linear-gradient(135deg, #ecf0f1 0%, #bdc3c7 100%)'; // Snowy
        break;
      default:
        background = 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'; // Default
    }

    return { background };
  };

  return (
    <div className="App" style={getBackgroundStyle()}>
      <h1>Weather Dashboard</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Search</button>
      </form>

      {error && <p className="error">{error}</p>}

      {weatherData && (
        <div className="weather-info">
          <h2>Weather in {weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
