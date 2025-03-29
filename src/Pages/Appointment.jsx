import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { AppContext } from '../context/AppContext';
import { format, addDays, setHours, setMinutes, isSameDay } from 'date-fns';
import RelatedDoctors from '../Componets/RelatedDoctors';

const AppointmentPage = () => {
  const { docId } = useParams();
  const { doctors, currentSymbol } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  useEffect(() => {
    const doctorInfo = doctors.find((doc) => doc.id.toString() === docId);
    setDocInfo(doctorInfo);
  }, [doctors, docId]);

  useEffect(() => {
    if (!docInfo) return;

    const generateSlots = () => {
      let today = new Date();
      let allSlots = [];

      for (let i = 0; i < 7; i++) {
        let currentDate = addDays(today, i);
        let startTime = setHours(setMinutes(currentDate, 0), 10); // Start at 10 AM
        let endTime = setHours(setMinutes(currentDate, 0), 21); // End at 9 PM

        let timeSlots = [];
        while (startTime < endTime) {
          timeSlots.push({
            datetime: new Date(startTime),
            time: format(startTime, 'hh:mm a'),
          });

          startTime = new Date(startTime.getTime() + 30 * 60000); // Add 30 minutes
        }

        allSlots.push({
          day: daysOfWeek[currentDate.getDay()],
          date: format(currentDate, 'dd MMM'), // Display correct date
          slots: timeSlots,
        });
      }

      setDocSlots(allSlots);
    };

    generateSlots();
  }, [docInfo]);

  return docInfo && (
    <div className="wrapper font-outfit px-4 lg:px-0">
      {/* Doctor Detail */}
      <div className='flex flex-col md:flex-row gap-4'>
        <div>
          <img src={docInfo.image} alt={docInfo.speciality} className='bg-primary w-full md:max-w-72 rounded-lg' />
        </div>
        <div className='flex-1 border border-secondary-100 rounded-lg p-8 py-7 bg-white mx-2 md:mx-0 mt-[-40px] md:mt-0'>
          <p className='flex items-center gap-2 text-2xl md:text-[36px] font-medium text-primary-100'>
            {docInfo.name}
            <img src="/images/Vector.png" alt={docInfo.speciality} className='size-[25px]'/>
          </p>
          <div className='flex items-center gap-2 text-secondary-300 mt-2'>
            <p className='text-sm md:text-xl'>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='text-base py-0.5 px-2 border rounded-full'>{docInfo.experience}</button>
          </div>
          <div>
            <p className='flex items-center gap-1 text-lg font-medium text-secondary-300 mt-3'>
              About <img src="/images/info.png" alt="info-logo" className='size-[17px]' />
            </p>
            <p className='text-lg text-secondary-300 max-w-[700px] mt-1'>{docInfo.about}</p>
          </div>
          <p className='text-[22px] text-secondary-300 mt-4'>
            Appointment fee: <span className='font-medium'>{currentSymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className='sm:ml-72 sm:pl-4 mt-8  mb-20'>
        <p className='text-[25px] text-secondary-400 font-medium'>Booking Slots</p>
        <div className='w-full flex gap-3 items-center overflow-x-auto mt-4'>
          {docSlots.map((item, index) => (
            <div
              onClick={() => setSlotIndex(index)}
              className={`text-center py-4 min-w-[5rem] rounded cursor-pointer ${
                slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'
              }`}
              key={index}
            >
              <p>{item.day}</p>
              <p>{item.date}</p>
            </div>
          ))}
        </div>

        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {docSlots[slotIndex]?.slots.map((item, index) => (
            <p 
              onClick={() => setSlotTime(item.time)}
              key={index}
              className={`text-sm font-light flex flex-shrink-0 px-5 py-2 rounded cursor-pointer ${
                item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'
              }`}
            >
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>
        <button className='bg-primary text-white text-sm font-light px-14 py-3 rounded my-6'>Appointment</button>
      </div>


       {/* ------------------Listing Related Doctors----------------------- */}
       <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>
    </div>
  );
};

export default AppointmentPage;
