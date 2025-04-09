import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { AppContext } from '../context/AppContext';
import { format, addDays, setHours, setMinutes } from 'date-fns';
import { supabase } from '../libs/supabase';
import RelatedDoctors from '../Componets/RelatedDoctors';

const AppointmentPage = () => {
  const { docId } = useParams();
  const { doctors, currentSymbol, user } = useContext(AppContext); // Ensure `user` has `id`
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const [bookingStatus, setBookingStatus] = useState(null);

  useEffect(() => {
    const doctorInfo = doctors.find((doc) => doc.id.toString() === docId);
    setDocInfo(doctorInfo);
  }, [doctors, docId]);

  useEffect(() => {
    if (!docInfo) return;

    const generateSlots = () => {
      const today = new Date();
      const allSlots = [];

      for (let i = 0; i < 7; i++) {
        const currentDate = addDays(today, i);
        let startTime = setHours(setMinutes(currentDate, 0), 10); // 10 AM
        const endTime = setHours(setMinutes(currentDate, 0), 21); // 9 PM

        const timeSlots = [];
        while (startTime < endTime) {
          timeSlots.push({
            datetime: new Date(startTime),
            time: format(startTime, 'HH:mm'), // for DB insert
            displayTime: format(startTime, 'hh:mm a'), // for UI
          });
          startTime = new Date(startTime.getTime() + 30 * 60000); // Add 30 minutes
        }

        allSlots.push({
          day: daysOfWeek[currentDate.getDay()],
          date: format(currentDate, 'yyyy-MM-dd'), // DB format
          displayDate: format(currentDate, 'dd MMM'), // UI format
          slots: timeSlots,
        });
      }

      setDocSlots(allSlots);
    };

    generateSlots();
  }, [docInfo]);

  const handleBookAppointment = async () => {
    if (!user || !user.id) {
      setBookingStatus({ success: false, message: "Please log in to book an appointment." });
      return;
    }

    const selectedSlot = docSlots[slotIndex]?.slots.find(s => s.time === slotTime);
    if (!selectedSlot) {
      setBookingStatus({ success: false, message: "Please select a valid time slot." });
      return;
    }

    const { data, error } = await supabase.from("appointments").insert([
      {
        user_id: user.id,
        doctor_id: docId,
        appointment_date: docSlots[slotIndex].date,
        appointment_time: selectedSlot.time,
        status: "pending",
        notes: "", // Optional: add a notes field if needed
      },
    ]);

    if (error) {
      setBookingStatus({ success: false, message: error.message });
    } else {
      setBookingStatus({ success: true, message: "Appointment booked successfully!" });
    }
  };

  return docInfo && (
    <div className="wrapper font-outfit px-4 lg:px-0">
      {/* Doctor Info */}
      <div className='flex flex-col md:flex-row gap-4'>
        <div>
          <img src={docInfo.image_url} alt={docInfo.specialty} className='bg-primary w-full md:max-w-72 rounded-lg' />
        </div>
        <div className='flex-1 border border-secondary-100 rounded-lg p-8 py-7 bg-white mx-2 md:mx-0 mt-[-40px] md:mt-0'>
          <p className='flex items-center gap-2 text-2xl md:text-[36px] font-medium text-primary-100'>
            {docInfo.name}
            <img src="/images/Vector.png" alt={docInfo.specialty} className='size-[25px]'/>
          </p>
          <div className='flex items-center gap-2 text-secondary-300 mt-2'>
            <p className='text-sm md:text-xl'>{docInfo.degree} - {docInfo.specialty}</p>
            <button className='text-base py-0.5 px-2 border rounded-full'>{docInfo.experience}</button>
          </div>
          <p className='flex items-center gap-1 text-lg font-medium text-secondary-300 mt-3'>
            About <img src="/images/info.png" alt="info-logo" className='size-[17px]' />
          </p>
          <p className='text-lg text-secondary-300 max-w-[700px] mt-1'>{docInfo.about}</p>
          <p className='text-[22px] text-secondary-300 mt-4'>
            Appointment fee: <span className='font-medium'>{currentSymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className='sm:ml-72 sm:pl-4 mt-8 mb-20'>
        <p className='text-lg md:text-[25px] text-secondary-400 font-medium'>Booking Slots</p>

        {/* Date Tabs */}
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
              <p>{item.displayDate}</p>
            </div>
          ))}
        </div>

        {/* Time Slots */}
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {docSlots[slotIndex]?.slots.map((item, index) => (
            <p 
              onClick={() => setSlotTime(item.time)}
              key={index}
              className={`text-sm font-light flex flex-shrink-0 px-5 py-2 rounded cursor-pointer ${
                item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'
              }`}
            >
              {item.displayTime.toLowerCase()}
            </p>
          ))}
        </div>

        <button
          className='bg-primary text-white text-sm font-light px-14 py-3 rounded my-6'
          onClick={handleBookAppointment}
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
      <RelatedDoctors docId={docId} speciality={docInfo.specialty} />
    </div>
  );
};

export default AppointmentPage;
