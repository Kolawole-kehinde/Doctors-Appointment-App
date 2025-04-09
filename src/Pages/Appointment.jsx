import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { format, addDays, setHours, setMinutes } from 'date-fns';
import { supabase } from '../libs/supabase';
import { useNavigate, useParams } from 'react-router';
import RelatedDoctors from '../Componets/RelatedDoctors';

const AppointmentPage = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const { doctors, currentSymbol, user } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const [bookingStatus, setBookingStatus] = useState(null);

  // Get doctor info
  useEffect(() => {
    const foundDoctor = doctors.find(doc => doc.id.toString() === docId);
    setDocInfo(foundDoctor);
  }, [doctors, docId]);

  // Generate weekly time slots
  useEffect(() => {
    if (!docInfo) return;

    const today = new Date();
    const allSlots = [];

    for (let i = 0; i < 7; i++) {
      const date = addDays(today, i);
      let start = setHours(setMinutes(date, 0), 10);
      const end = setHours(setMinutes(date, 0), 21);

      const timeSlots = [];
      while (start < end) {
        timeSlots.push({
          datetime: new Date(start),
          time: format(start, 'HH:mm'),
          displayTime: format(start, 'hh:mm a'),
        });
        start = new Date(start.getTime() + 30 * 60000);
      }

      allSlots.push({
        day: daysOfWeek[date.getDay()],
        date: format(date, 'yyyy-MM-dd'),
        displayDate: format(date, 'dd MMM'),
        slots: timeSlots,
      });
    }

    setDocSlots(allSlots);
  }, [docInfo]);

  // Handle booking
  const handleBookAppointment = async () => {
    if (!user?.id) {
      setBookingStatus({ success: false, message: "Please log in to book an appointment." });
      return;
    }

    const selectedDateObj = docSlots[slotIndex];
    const selectedSlot = selectedDateObj?.slots.find(s => s.time === slotTime);
    if (!selectedSlot) {
      setBookingStatus({ success: false, message: "Please select a valid time slot." });
      return;
    }

    const { error } = await supabase.from("appointments").insert([
      {
        user_id: user.id,
        doctor_id: docId,
        appointment_date: selectedDateObj.date,
        appointment_day: selectedDateObj.day, // Store weekday
        appointment_time: selectedSlot.time,
        status: "pending",
        notes: "",
      },
    ]);

    if (error) {
      setBookingStatus({ success: false, message: error.message });
    } else {
      setBookingStatus({ success: true, message: "Appointment booked successfully!" });

      // Optional delay for UI feedback, then redirect
      setTimeout(() => {
        navigate('/my-appointment');
      }, 1500);
    }
  };

  if (!docInfo) return null;

  return (
    <div className="wrapper font-outfit px-4 lg:px-0">
      {/* Doctor Info */}
      <div className='flex flex-col md:flex-row gap-4'>
        <div>
          <img src={docInfo.image_url} alt={docInfo.specialty} className='bg-primary w-full md:max-w-72 rounded-lg' />
        </div>
        <div className='flex-1 border border-secondary-100 rounded-lg p-8 py-7 bg-white mx-2 md:mx-0 mt-[-40px] md:mt-0'>
          <p className='flex items-center gap-2 text-2xl md:text-[36px] font-medium text-primary-100'>
            {docInfo.name}
            <img src="/images/Vector.png" alt="verified" className='size-[25px]' />
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
