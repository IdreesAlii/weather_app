import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [weather, setWeather] = useState({});
  const [thisLocation, setThisLocation] = useState('Fine, NY, USA');
  const [place, setPlace] = useState('fine');
  const [values, setValues] = useState([]);

  const fetchWeather = async (city) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://visual-crossing-weather.p.rapidapi.com/forecast',
      params: {
        location: city,
        aggregateHours: '1',
        contentType: 'json',
        unitGroup: 'metric',
        shortColumnNames: '0',
      },
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
        'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com',
      },
    };

    const response = await axios.request(options);

    // ✅ Now it's safe to log
    console.log("FULL API response ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
    console.log(JSON.stringify(response.data, null, 2));

    const locations = response.data.locations;
    const locationKey = Object.keys(locations)[0];
    const locationData = locations[locationKey];

    if (!locationData) {
      console.error('No data returned for the given city.');
      return;
    }

    const valuesArray = locationData.values;
    const current = valuesArray[0];

    setWeather(current);
    setThisLocation(`${locationData.address}`);
    setValues(valuesArray);
  } catch (error) {
    console.error('Weather fetch failed:', error);
  }
};


  useEffect(() => {
    if (place) {
      fetchWeather(place);
    }
  }, [place]);

  return (
    <Context.Provider
      value={{
        fetchWeather,
        weather,
        thisLocation,
        values,
        place,
        setPlace,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
