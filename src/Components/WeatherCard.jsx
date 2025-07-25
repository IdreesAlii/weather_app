/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useDate } from '../Utils/useDate'
import sun from '../assets/icons/sun.png'
import cloud from '../assets/icons/cloud.png'
import fog from '../assets/icons/fog.png'
import rain from '../assets/icons/rain.png'
import snow from '../assets/icons/snow.png'
import storm from '../assets/icons/storm.png'
import wind from '../assets/icons/windy.png'
import '../index.css'

const WeatherCard = ({
  temperature,
  windspeed,
  humidity,
  place,
  heatIndex,
  iconString,
  conditions,
}) => {

  const [icon, setIcon] = useState(sun)
  const { time } = useDate()

  useEffect(() => {
    if (iconString) {
      if (iconString.toLowerCase().includes('cloud')) {
        setIcon(cloud)
      } else if (iconString.toLowerCase().includes('rain')) {
        setIcon(rain)
      } else if (iconString.toLowerCase().includes('clear')) {
        setIcon(sun)
      } else if (iconString.toLowerCase().includes('thunder')) {
        setIcon(storm)
      } else if (iconString.toLowerCase().includes('fog')) {
        setIcon(fog)
      } else if (iconString.toLowerCase().includes('snow')) {
        setIcon(snow)
      } else if (iconString.toLowerCase().includes('wind')) {
        setIcon(wind)
      }
    }
  }, [iconString])

   return (
    <div className='w-[22rem] min-w-[22rem] min-h-[26rem] md:h-[30rem] glassCard p-4 flex flex-col justify-between'>

    {/* Temperature & Icon */}
    <div className='flex flex-col items-center gap-2 mt-4'>
      <img src={icon} alt="weather_icon" className='w-20 h-20' />
      <p className='text-5xl font-extrabold text-white'>{temperature}°C</p>
      <p className='text-xl text-blue-200 font-medium'>{conditions}</p>
    </div>

    {/* Location & Date */}
    <div className='text-center mt-4'>
      <p className='text-2xl font-semibold text-white'>{place}</p>
      <p className='text-sm text-slate-300'>{new Date().toDateString()} — {time}</p>
    </div>

    {/* Stats */}
    <div className='grid grid-cols-2 gap-3 mt-6'>
      <div className='rounded-xl border border-white/20 bg-white/5 p-3 text-center backdrop-blur-md shadow-sm'>
        <p className='text-sm text-sky-300 font-medium'>Wind</p>
        <p className='text-lg font-semibold text-white'>{windspeed} km/h</p>
      </div>
      <div className='rounded-xl border border-white/20 bg-white/5 p-3 text-center backdrop-blur-md shadow-sm'>
        <p className='text-sm text-pink-300 font-medium'>Humidity</p>
        <p className='text-lg font-semibold text-white'>{humidity} gm/m³</p>
      </div>
      <div className='rounded-xl border border-white/30 bg-gradient-to-r from-pink-500/30 to-indigo-500/30 p-3 text-center backdrop-blur-md shadow-lg col-span-2'>
        <p className='text-sm text-white/80 font-medium'>Heat Index</p>
        <p className='text-2xl font-bold text-white mt-1'>
          {heatIndex ? `${heatIndex}°C` : 'N/A'}
        </p>
      </div>
    </div>

  </div>
)





}

export default WeatherCard