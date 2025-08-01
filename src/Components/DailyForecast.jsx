import React from 'react';
import { MiniCard } from './index';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const DailyForecast = ({ data = [] }) => {
  if (!data.length) return null;

  return (
    <motion.div
      className="mt-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className='text-xl font-semibold text-white mb-3'>7-Day Forecast</h2>
      <div className="flex gap-4 overflow-x-auto min-w-max pb-4">
        {data.map((item, index) => (
          <MiniCard
            key={index}
            datetime={item.datetime}
            temp={item.temp}
            iconString={item.conditions}
            showDayOnly={true}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default DailyForecast;
