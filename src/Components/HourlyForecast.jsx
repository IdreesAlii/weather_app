/* eslint-disable react/prop-types */
import React from 'react';
import MiniCard from './MiniCard';

const HourlyForecast = ({ forecastData }) => {
  return (
    <div className="w-full mt-10 px-4">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-white drop-shadow">
        Hourly Forecast
      </h2>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {forecastData.map((hour, idx) => {
          const fullDatetime = `${hour.date}T${hour.time}`;
          return (
            <MiniCard
              key={idx}
              datetime={fullDatetime}
              temp={hour.temp}
              iconString={hour.condition}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;
