import React, { useState, useEffect } from 'react';
import './weather.css';
import { CiSearch } from "react-icons/ci";
import { WiHumidity } from "react-icons/wi";
import { FiWind } from "react-icons/fi";
import DrizzleImage from "/drizzle.gif";
import WeatherImage from "/weather.png";
import ClearImage from "/clear.gif";
import RainImage from "/rain.webp";
import CloudImage from "/cloud.gif";
import SnowImage from "/Snow.gif";

export const WeatherApp = () => {
  const [cityInputValue, setCityInputValue] = useState('');
  const [humidity, setHumidity] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [temperature, setTemperature] = useState('');
  const [location, setLocation] = useState('');
  const [wicon, setWicon] = useState(RainImage);

  let apiKey = 'bd5a2cd42b272968c0a8ed077e9f8883';

  const fetchWeatherData = async (city) => {
    let Url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${apiKey}`;
    let response = await fetch(Url);
    let data = await response.json();

    setHumidity(data.main.humidity);
    setWindSpeed(Math.floor(data.wind.speed));
    setTemperature(Math.floor(data.main.temp));
    setLocation(data.name);

    let icon = data.weather[0].icon;

    if (icon.includes("01")) {
      setWicon(ClearImage);
    } else if (icon.includes("02")) {
      setWicon(CloudImage);
    } else if (icon.includes("03") || icon.includes("04")) {
      setWicon(DrizzleImage);
    } else if (icon.includes("09") || icon.includes("10")) {
      setWicon(RainImage);
    } else if (icon.includes("13")) {
      setWicon(SnowImage);
    } else {
      setWicon(ClearImage);
    }
  };

  useEffect(() => {
    fetchWeatherData('Karachi');
  }, []); // Fetch weather data for Karachi when the component mounts

  const handleSearch = () => {
    if (cityInputValue === "") {
      return 0;
    }
    fetchWeatherData(cityInputValue);
    setCityInputValue('')
  };

  return (
    <div className="container">
    <div className='main' style={{ backgroundImage: `url(${wicon})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
      <div className='top-bar'>
        <input type="search" name="" className="cityInput" value={cityInputValue} onChange={(e) => setCityInputValue(e.target.value)} placeholder='Search' />
        <div className="searchIcon" onClick={handleSearch}>
          <CiSearch />
        </div>
      </div>
      <div className="weather-tepm">{temperature}°C</div>
      <div className="weather-location">{location}</div>
      <div className="data-container">
        <div className="element">
          <WiHumidity className='icon' />
          <div className="data">
            <div className="humidity-percent">{humidity} %</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <FiWind className='icon' />
          <div className="data">
            <div className="humidity-percent">{windSpeed} km/h</div>
            <div className="text">Wind speed</div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};
