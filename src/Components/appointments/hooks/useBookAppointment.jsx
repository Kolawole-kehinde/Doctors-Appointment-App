import { useState, useEffect, useCallback } from 'react';
import { format, addDays, setHours, setMinutes } from 'date-fns';
import { supabase } from '../../../libs/supabase';

export const useAppointment = (docId, doctors, user) => {
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const [bookingStatus, setBookingStatus] = useState(null);

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];

  /**
   * Fetch doctor information
   */
  useEffect(() => {
    if (!docId || !doctors?.length) return;

    const foundDoctor = doctors.find(doc => doc.id?.toString() === docId);
    setDocInfo(foundDoctor || null);
  }, [docId, doctors]);

  /**
   * Generate time slots for the next 7 days
   */
  useEffect(() => {
    if (!docInfo) return;

    const today = new Date();
    const generatedSlots = Array.from({ length: 7 }, (_, i) => {
      const date = addDays(today, i);
      const start = setHours(setMinutes(date, 0), 10);
      const end = setHours(setMinutes(date, 0), 21);

      const slots = [];
      let current = new Date(start);

      while (current < end) {
        slots.push({
          datetime: new Date(current),
          time: format(current, 'HH:mm'),
          displayTime: format(current, 'hh:mm a'),
        });
        current = new Date(current.getTime() + 30 * 60 * 1000); // 30 mins
      }

      return {
        day: daysOfWeek[date.getDay()],
        date: format(date, 'yyyy-MM-dd'),
        displayDate: format(date, 'dd MMM'),
        slots,
      };
    });

    setDocSlots(generatedSlots);
  }, [docInfo]);

  /**
   * Book an appointment
   */
  const handleBookAppointment = useCallback(async (navigate) => {
    if (!user?.id) {
      return setBookingStatus({ success: false, message: 'Please log in to book an appointment.' });
    }

    const selectedDate = docSlots[slotIndex];
    const selectedSlot = selectedDate?.slots.find(slot => slot.time === slotTime);

    if (!selectedSlot) {
      return setBookingStatus({ success: false, message: 'Please select a valid time slot.' });
    }

    const { error } = await supabase.from('appointments').insert([
      {
        user_id: user.id,
        doctor_id: docId,
        appointment_date: selectedDate.date,
        appointment_day: selectedDate.day,
        appointment_time: selectedSlot.time,
        status: 'pending',
        notes: '',
      },
    ]);

    if (error) {
      setBookingStatus({ success: false, message: error.message });
    } else {
      setBookingStatus({ success: true, message: 'Appointment booked successfully!' });

      // Optional: debounce navigation slightly
      setTimeout(() => navigate('/my-appointment'), 1500);
    }
  }, [user?.id, slotIndex, slotTime, docSlots, docId]);

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
