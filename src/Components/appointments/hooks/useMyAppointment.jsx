import { useEffect, useState } from "react";
import { supabase } from "../../../libs/supabase";

export const useMyAppointments = (user) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user?.id) return;

      const { data, error } = await supabase
        .from("appointments")
        .select("*, doctors(*)")
        .eq("user_id", user.id)
        .order("appointment_date", { ascending: false });

      if (error) {
        console.error("Error fetching appointments:", error);
      } else {
        setAppointments(data);
      }
      setLoading(false);
    };

    fetchAppointments();
  }, [user]);

  const cancelAppointment = async (appointmentId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this appointment?");
    if (!confirmCancel) return;

    const { error } = await supabase
      .from("appointments")
      .delete()
      .eq("id", appointmentId);

    if (error) {
      console.error("Failed to cancel appointment:", error);
      alert("Error cancelling appointment.");
    } else {
      setAppointments((prev) => prev.filter((appt) => appt.id !== appointmentId));
    }
  };

  return { appointments, loading, cancelAppointment };
};
