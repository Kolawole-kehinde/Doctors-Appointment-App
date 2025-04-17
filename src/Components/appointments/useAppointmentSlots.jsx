// hooks/useBookAppointment.js
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../../libs/supabase';

export const useAppointmentSlots = (user, docId) => {
  const [bookingStatus, setBookingStatus] = useState(null);
  const navigate = useNavigate();

  const book = async (slotTime, slotIndex, docSlots) => {
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

  return { book, bookingStatus };
};
