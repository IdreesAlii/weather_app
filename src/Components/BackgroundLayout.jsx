import React, { useEffect, useState } from 'react';
import { useStateContext } from '../Context';
import { motion, AnimatePresence } from 'framer-motion';

const weatherColors = {
  clear: 'from-blue-400 to-indigo-600',
  cloudy: 'from-gray-400 to-gray-700',
  rain: 'from-blue-800 to-gray-900',
  snow: 'from-white to-blue-200',
  fog: 'from-gray-300 to-gray-500',
  storm: 'from-indigo-800 to-black',
  default: 'from-sky-500 to-blue-800',
};

const getGradient = (condition = '') => {
  const c = condition.toLowerCase();
  if (c.includes('clear') || c.includes('sun')) return weatherColors.clear;
  if (c.includes('cloud')) return weatherColors.cloudy;
  if (c.includes('rain') || c.includes('shower')) return weatherColors.rain;
  if (c.includes('snow')) return weatherColors.snow;
  if (c.includes('fog')) return weatherColors.fog;
  if (c.includes('thunder') || c.includes('storm')) return weatherColors.storm;
  return weatherColors.default;
};

const BackgroundLayout = () => {
  const { weather } = useStateContext();
  const [bgGradient, setBgGradient] = useState(weatherColors.default);

  useEffect(() => {
    if (weather?.conditions) {
      setBgGradient(getGradient(weather.conditions));
    }
  }, [weather]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={bgGradient}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
        className={`fixed inset-0 -z-10 bg-gradient-to-b ${bgGradient} blur-sm`}
      />
    </AnimatePresence>
  );
};

export default BackgroundLayout;
