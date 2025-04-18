import React, { useContext } from "react";
import { useMyAppointments } from "../Components/appointments/hooks/useMyAppointment";
import { AppContext } from "../context/AppContext";
import AppointmentCard from "../Components/appointments/AppointmentCard";


const MyAppointment = () => {
  const { user } = useContext(AppContext);
  const { appointments, loading, cancelAppointment } = useMyAppointments(user);

  if (loading) {
    return (
      <div className="wrapper py-10 text-center">
        <p>Loading appointments...</p>
      </div>
    );
  }

  return (
    <div className="wrapper py-10 px-4 lg:px-0">
      <p className="pb-3 mt-12 font-medium text-secondary-200 border-b">
        My Appointments
      </p>

      {appointments.length === 0 ? (
        <p className="text-center text-lg text-secondary-500 mt-6">
          No appointments booked yet.
        </p>
      ) : (
        <div className="mt-4 space-y-6">
          {appointments.map((appt) => (
            <AppointmentCard key={appt.id} appt={appt} onCancel={cancelAppointment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointment;
