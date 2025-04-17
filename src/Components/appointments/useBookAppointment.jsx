import { useState, useEffect, useCallback } from 'react';
import { format, addDays, setHours, setMinutes } from 'date-fns';
import { supabase } from '../../libs/supabase';

export const useAppointment = (docId, doctors, user) => {
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const [bookingStatus, setBookingStatus] = useState(null);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];

  // Get doctor info
  useEffect(() => {
    const foundDoctor = doctors.find(doc => doc.id.toString() === docId);
    setDocInfo(foundDoctor || null);
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

  // Booking handler
  const handleBookAppointment = useCallback(async (navigate) => {
    if (!user?.id) {
      return setBookingStatus({ success: false, message: "Please log in to book an appointment." });
    }

    const selectedDateObj = docSlots[slotIndex];
    const selectedSlot = selectedDateObj?.slots.find(s => s.time === slotTime);

    if (!selectedSlot) {
      return setBookingStatus({ success: false, message: "Please select a valid time slot." });
    }

    const { error } = await supabase.from("appointments").insert([
      {
        user_id: user.id,
        doctor_id: docId,
        appointment_date: selectedDateObj.date,
        appointment_day: selectedDateObj.day,
        appointment_time: selectedSlot.time,
        status: "pending",
        notes: "",
      },
    ]);

    if (error) {
      setBookingStatus({ success: false, message: error.message });
    } else {
      setBookingStatus({ success: true, message: "Appointment booked successfully!" });
      setTimeout(() => {
        navigate('/my-appointment');
      }, 1500);
    }
  }, [user, docSlots, slotIndex, slotTime, docId]);

  return {
    docInfo,
    docSlots,
    slotIndex,
    setSlotIndex,
    slotTime,
    setSlotTime,
    handleBookAppointment,
    bookingStatus,
  };
};
