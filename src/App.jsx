import { useState, useEffect } from 'react';
import './App.css';
import search from './assets/icons/search.svg';
import { useStateContext } from './Context';
import { BackgroundLayout, WeatherCard, MiniCard } from './Components';
import HourlyForecast from './Components/HourlyForecast';

function App() {
  const [glow, setGlow] = useState(true);
  const [input, setInput] = useState('');
  const { fetchWeather, weather, thisLocation, values } = useStateContext();
  const [suggestions, setSuggestions] = useState([]);


  useEffect(() => {
    const timer = setTimeout(() => setGlow(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const submitCity = () => {
    if (!input.trim()) return;
    fetchWeather(input.trim());
    setInput('');
  };

const suggestionTypeShit = (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    const dummyCities = [
      "Lahore, Pakistan",
      "Islamabad, Pakistan",
      "Karachi, Pakistan",
      "Gilgit, Pakistan",
      "Quetta, Pakistan",
    ]
    const matched = dummyCities.filter(city => city.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(matched);

  }

  return (
    <div className="min-h-screen w-full overflow-y-auto bg-gradient-to-b from-[#0f172a] to-[#1e293b] px-4 md:px-8 py-6">
      {/* NAVIGATION */}
      <nav className="flex flex-col items-center justify-center text-center min-h-[20vh] gap-6 px-4 mb-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-sky-400 to-indigo-500 text-transparent bg-clip-text drop-shadow-2xl">
            Weather App
          </h1>
          <p className="text-lg md:text-xl text-blue-200 drop-shadow-sm mt-2">
            Get real-time weather updates in your city
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-xs mt-4">
          <div
            className={`flex items-center rounded-md px-4 relative ${
              glow ? 'glow-pulse' : ''
            } bg-blue-950/50 border border-blue-600 shadow-lg`}
          >
            {/* <img
              src={search}
              alt="search"
              className="invert brightness-0 w-[1.5rem] h-[1.5rem] mr-3 opacity-80 hover:opacity-100 transition duration-300"
            /> */}
            <input
              type="text"
              placeholder="Search city..."
              value={input}
              onChange={(e) =>{
                const typedText = e.target.value;
                suggestionTypeShit(typedText);
                setInput(e.target.value)}}
              onKeyDown={(e) => {
                if (e.key === 'Enter') submitCity();
              }}
              className="h-14 w-full text-[1.2rem] bg-transparent text-white placeholder-blue-300 focus:outline-none pl-4"
            />
            {suggestions.length > 0 && (
              <div className='absolute top-full mt-2 w-full bg-white z-10 rounded-md shadow-lg max-h-48 overflow-y-auto'>
                {suggestions.map((city, index) => (
                  <p className='
                  px-4 py-2 hover:bg-blue-100 cursor-pointer text-gray-800'
                  key={index}
                  onClick={() => {
                    setInput(city);
                    setSuggestions([]);
                  }}
                  >
                    {city}
                  </p>
                ))}
              </div>
            )}


            <button onClick={submitCity}
            className='active:scale-95 bg-sky-500 ml-2 hover:bg-sky-600 hover:shadow-lg hover:scale-105 shadow-md rounded-full aspect-square h-10 w-10 flex items-center justify-center transition ring-1 ring-white/20'
            >🔎</button>
          </div>
        </div>
      </nav>

      {/* Background Effect */}
      <BackgroundLayout />

      {/* MAIN SECTION */}
      <main className="w-full flex flex-col items-center gap-8 py-4 px-4 md:px-12 lg:px-24">
        <WeatherCard
          place={thisLocation}
          windspeed={weather.wspd}
          humidity={weather.humidity}
          temperature={weather.temp}
          heatIndex={weather.heatindex}
          iconString={weather.conditions}
          conditions={weather.conditions}
        />


        <div className="w-full max-w-4xl flex flex-wrap justify-center gap-8">
          {values?.slice(1, 7).map((hour, idx) => (
            <MiniCard
              key={idx}
              time={hour.datetime}
              temp={hour.temp}
              iconString={hour.conditions}
            />
          ))}
        </div>

        {values && values.length > 0 && (
          <HourlyForecast forecastData={values.slice(0, 12)} />
        )}
      </main>
    </div>
  );
}

export default App;
