import { useContext, createContext, useState, useEffect } from "react";
import axios from 'axios'

const StateContext = createContext()

export const StateContextProvider = ({ children }) => {
    const [weather, setWeather] = useState({})
    const [values, setValues] = useState([])
    const [place, setPlace] = useState('Lahore')
    const [thisLocation, setLocation] = useState('')

    // fetch api
    const fetchWeather = async (location) => {
    const encodedLocation = encodeURIComponent(location);

    const options = {
        method: 'GET',
        url: 'https://visual-crossing-weather.p.rapidapi.com/forecast',
        params: {
            aggregateHours: '24',
            location: encodedLocation,
            contentType: 'json',
            unitGroup: 'metric',
            shortColumnNames: 0,
            },
            headers: {
                'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
                'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
            }
        }

        try {
            const response = await axios.request(options);
            const thisData = Object.values(response.data.locations)[0];
            setLocation(thisData.address);
            setValues(thisData.values);
            setWeather(thisData.values[0]);
        } catch (e) {
            console.error(e);
            alert('This place does not exist');
        }
    }


    useEffect(() => {
        fetchWeather()
    }, [place])

    useEffect(() => {
        console.log(values)
    }, [values])

    return (
      <StateContext.Provider value={{
          weather,
          values,
          thisLocation,
          fetchWeather, // ✅ NEW
      }}>
          {children}
      </StateContext.Provider>
    )

}

export const useStateContext = () => useContext(StateContext)