/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import sun from '../assets/icons/sun.png'
import cloud from '../assets/icons/cloud.png'
import fog from '../assets/icons/fog.png'
import rain from '../assets/icons/rain.png'
import snow from '../assets/icons/snow.png'
import storm from '../assets/icons/storm.png'
import wind from '../assets/icons/windy.png'

const MiniCard = ({ time, temp, iconString }) => {
  const [icon, setIcon] = useState(sun)

  useEffect(() => {
    if (iconString) {
      const lower = iconString.toLowerCase()
      if (lower.includes('cloud')) setIcon(cloud)
      else if (lower.includes('rain')) setIcon(rain)
      else if (lower.includes('clear')) setIcon(sun)
      else if (lower.includes('thunder')) setIcon(storm)
      else if (lower.includes('fog')) setIcon(fog)
      else if (lower.includes('snow')) setIcon(snow)
      else if (lower.includes('wind')) setIcon(wind)
    }
  }, [iconString])

  return (
    <div className='glassCard w-[10rem] h-[10rem] p-4 flex flex-col'>
      <p className='text-center font-medium text-white'>
        {new Date(time).toLocaleTimeString('en', { weekday: 'long' }).split(" ")[0]}
      </p>
      <hr className='my-1 border-gray-400' />
      <div className='w-full flex justify-center items-center flex-1'>
        <img src={icon} alt="forecast" className='w-[3.5rem] h-[3.5rem]' />
      </div>
      <p className='text-center font-bold text-lg text-white'>{temp}&deg;C</p>
    </div>
  )
}

export default MiniCard
