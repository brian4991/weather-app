import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsSearch } from 'react-icons/bs';
import Weather from '../components/Weather';
import Notfound from '../components/Notfound';
import Spinner from '../components/Spinner';

function Fetch() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const key = '42994706053b951c1deb8b2c0e6500da';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;

  

  const fetchWeather = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .get(url)
      .then((response) => {
        setWeather(response.data);
        setError('');
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError('There was an error.');
        setWeather({});
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 px-4 z-10">
        <form
          onSubmit={(e) => fetchWeather(e)}
          className="flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 rounded-2xl"
        >
          <div>
            <input
              onChange={(e) => setCity(e.target.value)}
              className="bg-transparent border-none focus:outline-none text-2xl"
              type="text"
              placeholder="Search city"
            />
          </div>
          <button type="submit">
            <BsSearch size={20} />
          </button>
        </form>
        
      </div>
      {loading ? <Spinner /> : Object.keys(weather).length > 0 ? <Weather data={weather as any}  /> : error ? <Notfound /> : null}
    </div>
  );
}

export default Fetch;
