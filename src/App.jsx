import { useState, useEffect } from 'react'
import './App.css'
import search from './assets/icons/search.svg'
import { useStateContext } from './Context'
import { BackgroundLayout, WeatherCard, MiniCard } from './Components'
import HourlyForecast from './Components/HourlyForecast' // ✅ (added line)

function App() {
  const [glow, setGlow] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setGlow(false), 4000)
    return () => clearTimeout(timer)
  }, [])

  const [input, setInput] = useState('')
  const { weather, thisLocation, values, place, setPlace } = useStateContext()

  const submitCity = () => {
    setPlace(input)
    setInput('')
  }

  return (
    <div className='min-h-screen w-full bg-gradient-to-b from-[#0f172a] to-[#1e293b] px-4 md:px-8 py-6'>

      {/* NAVIGATION */}
      <nav className='flex flex-col md:flex-row gap-6 mb-10'>

        {/* Title and Subtitle */}
        <div className='flex flex-col gap-2'>
          <h1 className='text-4xl md:text-6xl font-bold bg-gradient-to-r from-sky-400 to-indigo-500 text-transparent bg-clip-text drop-shadow-2xl'>
            Weather App
          </h1>
          <p className='text-lg md:text-xl text-blue-200 drop-shadow-sm mt-2 mb-6'>
            Get real-time weather updates in your city
          </p>
        </div>

        {/* Search Bar */}
        <div className='md:ml-10 md:mt-6 w-full max-w-sm'>
  <div className={`flex items-center rounded-md px-4 ${glow ? 'glow-pulse' : ''} bg-blue-950/50 border border-blue-600 shadow-lg`}>
    <img
      src={search}
      alt="search"
      className='invert brightness-0 w-[1.5rem] h-[1.5rem] mr-3 opacity-80 hover:opacity-100 transition duration-300'
    />
    <input
      onKeyUp={(e) => {
        if (e.key === 'Enter') submitCity();
      }}
      type="text"
      placeholder='Search city'
      className='h-14 w-full text-[1.2rem] bg-transparent text-white placeholder-blue-300 focus:outline-none pl-4'
      value={input}
      onChange={e => setInput(e.target.value)}
    />
  </div>
</div>


      </nav>

      {/* Background */}
      <BackgroundLayout />

      {/* MAIN WEATHER CARDS */}
      <main className='w-full min-h-screen flex flex-col items-center gap-8 py-4 px-4 md:px-12 lg:px-24'>
        <WeatherCard
          place={thisLocation}
          windspeed={weather.wspd}
          humidity={weather.humidity}
          temperature={weather.temp}
          heatIndex={weather.heatindex}
          iconString={weather.conditions}
          conditions={weather.conditions}
        />

        <div className='w-full max-w-4xl flex flex-wrap justify-center gap-8'>
          {values?.slice(1, 7).map(curr => (
            <MiniCard
              key={curr.datetime}
              time={curr.datetime}
              temp={curr.temp}
              iconString={curr.conditions}
            />
          ))}
        </div>

        {/* ✅ Added new section for Hourly Forecast */}
        {values && values.length > 0 && (
          <HourlyForecast forecastData={values.slice(0, 12)} />
          // Shows 12 hours forecast only if data is available
        )}
      </main>
    </div>
  )
}

export default App
