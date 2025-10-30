// import React, { useState } from 'react'
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import "./SearchBox.css"
// import WeatherApp from './weatherApp';
// export default function SearchBox({updateInfo}) {
//     let [city,setCity]=useState("");
//     let [error,setError]=useState(false);
    
//     const API_URL="https://api.openweathermap.org/data/2.5/weather";
//     const API_KEY="6a45c0fb50f836d0e6b129daa78afc1a";
//     let getWeatherInfo=async(city)=>{
//         try{
//         let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}`);
//         let jsonResponse=await response.json();
//     console.log(jsonResponse);
//     let result={
//         city:city,
//         temp:jsonResponse.main.temp,
//         tempMin:jsonResponse.main.temp_min,
//         tempMax:jsonResponse.main.temp_max,
//         humidity:jsonResponse.main.humidity,
//         feelsLike:jsonResponse.main.feels_like,
//         weather:jsonResponse.weather[0].description,
//     }
//     console.log(result);
//     return result;
// }
// catch(err){
//    throw err;
// }
// };
//     let handleChange=(evt)=>{
//         setCity(evt.target.value);
//     }
//     let handleSubmit=async(evt)=>{
//         try{
//         evt.preventDefault();
//         console.log(city);
//         setCity("");
//         let newinfo=await getWeatherInfo(city);
//         updateInfo(newinfo);
//         }catch(err){
//             setError(true);
//         }
//     };
//   return (
//     <div className='search-box'><h2>Search For Weather</h2>
//     <form onSubmit={handleSubmit}>
//         <TextField 
//         id="city" 
//         label="city name" 
//         variant="outlined" 
//         required 
//         value={city} 
//         onChange={handleChange}/>
//        <br></br>
//        <br></br>
//         <Button 
//         variant="contained" 
//         type="submit">
//         Submit</Button>
//         {error && <p style={{color:"red"}}>No such place exists in API</p>}
//         </form>
//     </div>
//   )
// }


import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './SearchBox.css';
import WeatherApp from './weatherApp';

export default function SearchBox({ updateInfo }) {
  const [city, setCity] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Open-Meteo API (No API Key Needed)
  const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';
  const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

  // ✅ Fetch weather info based on city name
  const getWeatherInfo = async (city) => {
    try {
      // Step 1: Get latitude & longitude
      const geoResponse = await fetch(`${GEO_URL}?name=${city}`);
      const geoData = await geoResponse.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error('City not found');
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      // Step 2: Fetch current weather using coordinates
      const weatherResponse = await fetch(
        `${WEATHER_URL}?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await weatherResponse.json();

      const result = {
        city: `${name}, ${country}`,
        temperature: weatherData.current_weather.temperature,
        windspeed: weatherData.current_weather.windspeed,
        weatherCode: weatherData.current_weather.weathercode,
        time: weatherData.current_weather.time,
      };

      console.log(result);
      return result;
    } catch (err) {
      throw err;
    }
  };

  // ✅ Handle text input
  const handleChange = (evt) => {
    setCity(evt.target.value);
  };

  // ✅ Handle form submit
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setError(false);
    setLoading(true);

    try {
      const newInfo = await getWeatherInfo(city);
      updateInfo(newInfo);
      setCity('');
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-box">
      <h2>Search For Weather</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          id="city"
          label="City Name"
          variant="outlined"
          required
          value={city}
          onChange={handleChange}
        />
        <br />
        <br />
        <Button variant="contained" type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </Button>
        {error && (
          <p style={{ color: 'red', marginTop: '10px' }}>
            ❌ No such city found. Try again.
          </p>
        )}
      </form>
    </div>
  );
}

