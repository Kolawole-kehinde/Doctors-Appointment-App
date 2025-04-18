import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate, useParams } from 'react-router';
import { useAppointment } from '../Components/appointments/hooks/useBookAppointment';
import RelatedDoctors from '../Components/appointments/RelatedDoctors';



const AppointmentPage = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const { doctors, currentSymbol, user } = useContext(AppContext);

  const {
    docInfo,
    docSlots,
    slotIndex,
    setSlotIndex,
    slotTime,
    setSlotTime,
    handleBookAppointment,
    bookingStatus,
  } = useAppointment(docId, doctors, user);

  if (!docInfo) return <p className="text-center mt-10">Loading doctor information...</p>;

  return (
    <div className="wrapper font-outfit px-4 lg:px-0">
      {/* Doctor Info */}
      <div className='flex flex-col md:flex-row gap-4'>
        <img src={docInfo.image_url} alt={docInfo.specialty} className='bg-primary w-full md:max-w-72 rounded-lg' />
        <div className='flex-1 border border-secondary-100 rounded-lg p-8 py-7 bg-white'>
          <p className='text-2xl md:text-[36px] font-medium text-primary-100 flex items-center gap-2'>
            {docInfo.name}
            <img src="/images/Vector.png" alt="verified" className='size-[25px]' />
          </p>
          <div className='flex items-center gap-2 text-secondary-300 mt-2'>
            <p className='text-sm md:text-xl'>{docInfo.degree} - {docInfo.specialty}</p>
            <button className='text-base py-0.5 px-2 border rounded-full'>{docInfo.experience}</button>
          </div>
          <p className='text-lg font-medium text-secondary-300 mt-3 flex items-center gap-1'>
            About <img src="/images/info.png" alt="info-logo" className='size-[17px]' />
          </p>
          <p className='text-lg text-secondary-300 mt-1'>{docInfo.about}</p>
          <p className='text-[22px] text-secondary-300 mt-4'>
            Appointment fee: <span className='font-medium'>{currentSymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className='sm:ml-72 sm:pl-4 mt-8 mb-20'>
        <p className='text-lg md:text-[25px] text-secondary-400 font-medium'>Booking Slots</p>

        <div className='flex gap-3 overflow-x-auto mt-4'>
          {docSlots.map((item, index) => (
            <div
              onClick={() => setSlotIndex(index)}
              className={`text-center py-4 min-w-[5rem] rounded cursor-pointer ${
                slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'
              }`}
              key={index}
            >
              <p>{item.day}</p>
              <p>{item.displayDate}</p>
            </div>
          ))}
        </div>

        <div className='flex items-center gap-3 overflow-x-scroll mt-4'>
          {docSlots[slotIndex]?.slots.map((item, index) => (
            <p 
              key={index}
              onClick={() => setSlotTime(item.time)}
              className={`text-sm font-light px-5 py-2 rounded cursor-pointer flex-shrink-0 ${
                item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'
              }`}
            >
              {item.displayTime.toLowerCase()}
            </p>
          ))}
        </div>

        <button
          onClick={() => handleBookAppointment(navigate)}
          className='bg-primary text-white text-sm font-light px-14 py-3 rounded my-6'
        >
          Book Appointment
        </button>

        {bookingStatus && (
          <p className={`text-sm ${bookingStatus.success ? 'text-green-500' : 'text-red-500'}`}>
            {bookingStatus.message}
          </p>
        )}
      </div>

      {/* Related Doctors */}
      <RelatedDoctors docId={docId} specialty={docInfo.specialty} />


    </div>
  );
};

export default AppointmentPage;
