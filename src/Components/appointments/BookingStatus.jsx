import React from 'react';

const BookingStatus = ({ bookingStatus }) => {
  if (!bookingStatus) return null;

  return (
    <p className={`text-sm ${bookingStatus.success ? 'text-green-500' : 'text-red-500'}`}>
      {bookingStatus.message}
    </p>
  );
};

export default BookingStatus;
