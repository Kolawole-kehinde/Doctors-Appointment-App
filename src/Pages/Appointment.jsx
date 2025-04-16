import React, { useContext, useEffect, useState } from 'react';
import { format, addDays, setHours, setMinutes } from 'date-fns';
import { AppContext } from '../context/AppContext';
import { supabase } from '../libs/supabase';



import DoctorInfo from '../Components/appointments/DoctorInfo';
import BookingSlots from '../Components/appointments/BookingSlots';
import RelatedDoctors from '../Components/appointments/RelatedDoctors';
import { useNavigate, useParams } from 'react-router';
import TimeSlots from '../Components/appointments/TimeSlots';
import BookingStatus from '../Components/appointments/BookingStatus';

const AppointmentPage = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const { doctors, currentSymbol, user } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const [bookingStatus, setBookingStatus] = useState(null);

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];

  useEffect(() => {
    const foundDoctor = doctors.find(doc => doc.id.toString() === docId);
    setDocInfo(foundDoctor);
  }, [doctors, docId]);

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

    const { error } = await supabase.from("appointments").insert([{
      user_id: user.id,
      doctor_id: docId,
      appointment_date: selectedDateObj.date,
      appointment_day: selectedDateObj.day,
      appointment_time: selectedSlot.time,
      status: "pending",
      notes: "",
    }]);

    if (error) {
      setBookingStatus({ success: false, message: error.message });
    } else {
      setBookingStatus({ success: true, message: "Appointment booked successfully!" });
      setTimeout(() => navigate('/my-appointment'), 1500);
    }
  };

  if (!docInfo) return null;

  return (
    <div className="wrapper font-outfit px-4 lg:px-0">
      <DoctorInfo docInfo={docInfo} currentSymbol={currentSymbol} />

      <div className='sm:ml-72 sm:pl-4 mt-8 mb-20'>
        <p className='text-lg md:text-[25px] text-secondary-400 font-medium'>Booking Slots</p>
        <BookingSlots docSlots={docSlots} slotIndex={slotIndex} setSlotIndex={setSlotIndex} />
        <TimeSlots slotData={docSlots[slotIndex]} slotTime={slotTime} setSlotTime={setSlotTime} />

        <button className='bg-primary text-white text-sm font-light px-14 py-3 rounded my-6' onClick={handleBookAppointment}>
          Book Appointment
        </button>

        <BookingStatus bookingStatus={bookingStatus} />
      </div>

      <RelatedDoctors docId={docId} speciality={docInfo.specialty} />
    </div>
  );
};

export default AppointmentPage;
