import React from 'react';

const TimeSlots = ({ slotData, slotTime, setSlotTime }) => (
  <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
    {slotData?.slots.map((item, index) => (
      <p
        key={index}
        onClick={() => setSlotTime(item.time)}
        className={`text-sm font-light flex flex-shrink-0 px-5 py-2 rounded cursor-pointer ${
          item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'
        }`}
      >
        {item.displayTime.toLowerCase()}
      </p>
    ))}
  </div>
);

export default TimeSlots;
