

import React, { useState, useEffect } from 'react';
import SearchBox from './SearchBox';
import InfoBox from './InfoBox';

export default function WeatherApp() {
  const [weatherInfo, setWeatherInfo] = useState(null);

  const fetchWeather = async (city) => {
    try {
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
      );
      const geoData = await geoResponse.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error('City not found');
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await weatherResponse.json();

      const result = {
        city: `${name}, ${country}`,
        temperature: weatherData.current_weather.temperature,
        windspeed: weatherData.current_weather.windspeed,
        weatherCode: weatherData.current_weather.weathercode,
        time: weatherData.current_weather.time,
      };

      setWeatherInfo(result);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  useEffect(() => {
    fetchWeather('Kolkata');
  }, []);

  const updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
  };

  return (
    <div className="weatherinfo">
      <SearchBox updateInfo={updateInfo} />
      {weatherInfo ? (
        <InfoBox info={weatherInfo} />
      ) : (
        <p style={{ textAlign: 'center' }}>Loading weather for Kolkata...</p>
      )}
    </div>
  );
}
