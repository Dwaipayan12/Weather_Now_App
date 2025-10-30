import React from 'react'
import SearchBox from './SearchBox'
import InfoBox from './InfoBox'
import { useState } from 'react'
import "./weatherApp.css"
export default function WeatherApp() {
    const [weatherInfo,setWeatherInfo]=useState({
        city: "kolkata",
        feelsLike: 309.12,
        humidity: 89,
        temp: 302.12,
        tempMax: 302.12,
        tempMin: 302.12,
        weather: "haze",
    });
    let updateInfo=(newinfo)=>{
        setWeatherInfo(newinfo);
    }
  return (
    <div className="weatherinfo">
    <SearchBox updateInfo={updateInfo}/>
    <InfoBox info={weatherInfo}/>
    </div>
  )
}
