import React from 'react';

const BookingSlots = ({ docSlots, slotIndex, setSlotIndex }) => (
  <div className='w-full flex gap-3 items-center overflow-x-auto mt-4'>
    {docSlots.map((item, index) => (
      <div
        key={index}
        onClick={() => setSlotIndex(index)}
        className={`text-center py-4 min-w-[5rem] rounded cursor-pointer ${
          slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'
        }`}
      >
        <p>{item.day}</p>
        <p>{item.displayDate}</p>
      </div>
    ))}
  </div>
);

export default BookingSlots;
