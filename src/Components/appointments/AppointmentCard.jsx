import { format } from "date-fns";
import React from "react";

const AppointmentCard = ({ appt, onCancel }) => {
  const appointmentDate = new Date(appt.appointment_date);
  const formattedDate = format(appointmentDate, "dd MMM yyyy");
  const dayOfWeek = format(appointmentDate, "EEEE");

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b pb-4">
      <img
        src={appt.doctors?.image_url}
        alt={appt.doctors?.name}
        className="w-24 sm:w-32 border-indigo-50 bg-secondary object-cover border"
      />

      <div className="flex-1">
        <p className="text-lg font-semibold text-secondary-700">
          {appt.doctors?.name}
        </p>
        <p className="text-base">{appt.doctors?.specialty}</p>
        <p className="text-base font-medium mt-1">Address:</p>
        <p className="text-sm">{appt.doctors?.address}</p>
        <p className="text-sm mt-1">
          <span className="font-medium">Date & Time:</span> {dayOfWeek}, {formattedDate} | {appt.appointment_time}
        </p>
      </div>

      <div className="w-full sm:w-auto flex flex-col sm:gap-4">
        <button className="w-full sm:w-48 text-sm sm:text-base text-secondary-300 py-2 border rounded-md hover:bg-primary hover:text-white transition-all duration-300">
          Pay Online
        </button>
        <button
          onClick={() => onCancel(appt.id)}
          className="w-full sm:w-48 text-sm sm:text-base text-secondary-300 py-2 border rounded-md hover:bg-red-600 hover:text-white transition-all duration-300 mt-2 sm:mt-0"
        >
          Cancel Appointment
        </button>
      </div>
    </div>
  );
};

export default AppointmentCard;