import React, { useState, useEffect } from 'react';
import rain from '../assets/icons/rain.png';
import snow from '../assets/icons/snow.png';
import storm from '../assets/icons/storm.png';
import sun from '../assets/icons/sun.png';
import windy from '../assets/icons/windy.png';
import cloud from '../assets/icons/cloud.png';
import fog from '../assets/icons/fog.png';
import { motion } from 'framer-motion';

const MiniCard = ({ datetime, temp, iconString, showDayOnly = false }) => {
  const [icon, setIcon] = useState(sun);

  useEffect(() => {
    if (iconString) {
      const lower = iconString.toLowerCase();
      if (lower.includes('cloud')) setIcon(cloud);
      else if (lower.includes('rain')) setIcon(rain);
      else if (lower.includes('clear')) setIcon(sun);
      else if (lower.includes('thunder')) setIcon(storm);
      else if (lower.includes('fog')) setIcon(fog);
      else if (lower.includes('snow')) setIcon(snow);
      else if (lower.includes('wind')) setIcon(windy);
    }
  }, [iconString]);

  const format = (dt) => {
    if (!dt || !dt.includes('T')) return 'Invalid';
    const date = new Date(dt);
    return showDayOnly
      ? date.toLocaleDateString('en-US', { weekday: 'short' }) // "Mon"
      : date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className='flex flex-col justify-between items-center w-[6.5rem] h-[9rem] p-3 rounded-2xl bg-white/10 backdrop-blur-md shadow-md text-white'
    >
      <p className='text-sm font-medium'>{format(datetime)}</p>
      <img src={icon} alt="forecast" className='w-10 h-10 my-1' />
      <p className='text-base font-semibold'>{Math.round(temp)}°C</p>
    </motion.div>
  );
};

export default MiniCard;
