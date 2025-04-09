import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { supabase } from "../libs/supabase";

const MyAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AppContext);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user?.id) return;

      const { data, error } = await supabase
        .from("appointments")
        .select("*, doctors(*)")
        .eq("user_id", user.id)
        .order("appointment_date", { ascending: false });

      if (error) {
        toast.error("Error fetching appointments:", error);
      } else {
        setAppointments(data);
      }

      setLoading(false);
    };

    fetchAppointments();
  }, [user]);

  const handleCancel = async (appointmentId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this appointment?");
    if (!confirmCancel) return;

    const { error } = await supabase
      .from("appointments")
      .delete()
      .eq("id", appointmentId);

    if (error) {
      console.error("Failed to cancel appointment:", error);
      toast.error("Error cancelling appointment.");
    } else {
      setAppointments((prev) => prev.filter((appt) => appt.id !== appointmentId));
    }
  };

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
          {appointments.map((appt) => {
            const appointmentDate = new Date(appt.appointment_date);
            const formattedDate = format(appointmentDate, 'EEEE, MMMM dd, yyyy'); // Format weekday and date
            const formattedTime = format(appointmentDate, 'hh:mm a'); // Format time
            return (
              <div
                key={appt.id}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b pb-4"
              >
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
                    <span className="font-medium">Date & Time:</span>{" "}
                    {formattedDate} | {formattedTime}
                  </p>
                </div>

                <div className="w-full sm:w-auto flex flex-col sm:gap-4">
                  <button className="w-full sm:w-48 text-sm sm:text-base text-secondary-300 py-2 border rounded-md hover:bg-primary hover:text-white transition-all duration-300">
                    Pay Online
                  </button>
                  <button
                    onClick={() => handleCancel(appt.id)}
                    className="w-full sm:w-48 text-sm sm:text-base text-secondary-300 py-2 border rounded-md hover:bg-red-600 hover:text-white transition-all duration-300 mt-2 sm:mt-0"
                  >
                    Cancel Appointment
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyAppointment;
