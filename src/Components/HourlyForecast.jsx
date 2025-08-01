import React from 'react';
import MiniCard from './MiniCard';
import { motion } from 'framer-motion';

const HourlyForecast = ({ forecastData }) => {
  return (
    <div className="w-full px-4 mt-10">
      <h2 className="text-xl md:text-2xl font-semibold mb-6 text-white drop-shadow">
        Hourly Forecast
      </h2>

      <div className="flex md:flex-wrap flex-nowrap overflow-x-auto md:justify-center gap-4">
        {forecastData.map((hour, idx) => {
          const fullDatetime = `${hour.date}T${hour.time}`;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05, ease: 'easeOut' }}
            >
              <MiniCard
                datetime={fullDatetime}
                temp={hour.temp}
                iconString={hour.condition}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;
