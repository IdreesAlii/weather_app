import { createContext, useContext, useState } from 'react';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [weather, setWeather] = useState(null);
  const [values, setValues] = useState([]);
  const [thisLocation, setThisLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (location) => {
    if (!location) return;

    setIsLoading(true);
    setError(null);

    try {
      const encodedLocation = encodeURIComponent(location);

      const response = await fetch(
        `https://visual-crossing-weather.p.rapidapi.com/forecast?location=${encodedLocation}&aggregateHours=24&unitGroup=metric&shortColumnNames=true&contentType=json`,
        {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
            'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com',
          },
        }
      );

      const data = await response.json();

      if (!data || Object.keys(data).length === 0) {
        throw new Error("No weather data found for that location");
      }

      const locationKey = Object.keys(data.locations)[0];
      const weatherData = data.locations[locationKey];

      setWeather(weatherData.currentConditions);
      setValues(weatherData.values);
      setThisLocation(weatherData.resolvedAddress);setThisLocation(weatherData.resolvedAddress.split(',')[0]);



    } catch (err) {
      console.error(err);
      setError("Could not fetch weather for that location.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StateContext.Provider value={{
      weather,
      values,
      thisLocation,
      isLoading,
      error,
      fetchWeather
    }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
