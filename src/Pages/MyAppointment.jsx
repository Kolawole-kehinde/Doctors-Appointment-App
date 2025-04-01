import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const MyAppointment = () => {
  const { doctors } = useContext(AppContext);
  const bookedDoctors = doctors.slice(0, 3);

  return (
    <div className="wrapper py-10 px-4 lg:px-0">
      <p className="pb-3 mt-12 font-medium text-secondary-200 border-b">
        My Appointments
      </p>

      {bookedDoctors.length === 0 ? (
        <p className="text-center text-lg text-secondary-500 mt-6">
          No appointments booked yet.
        </p>
      ) : (
        <div className="mt-4 space-y-6">
          {bookedDoctors.map((doctor, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b pb-4"
            >
              {/* Image (Left on all screens) */}
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-24 sm:w-32 border-indigo-50 bg-secondary object-cover border"
              />

              {/* Doctor Info (Right of Image on all screens) */}
              <div className="flex-1">
                <p className="text-lg font-semibold text-secondary-700">
                  {doctor.name}
                </p>
                <p className="text-base">{doctor.speciality}</p>
                <p className="text-base font-medium mt-1">Address:</p>
                <p className="text-sm">{doctor.address}</p>
                <p className="text-sm mt-1">
                  <span className="font-medium">Date & Time:</span> July 25,
                  2024 | 8:30 PM
                </p>
              </div>

              {/* Buttons (Below text on mobile, side-by-side on larger screens) */}
              <div className="w-full sm:w-auto flex flex-col sm:gap-4">
                <button className="w-full sm:w-48 text-sm sm:text-base text-secondary-300 py-2 border rounded-md hover:bg-primary hover:text-white transition-all duration-300">
                  Pay Online
                </button>
                <button className="w-full sm:w-48 text-sm sm:text-base text-secondary-300 py-2 border rounded-md hover:bg-red-600 hover:text-white transition-all duration-300 mt-2 sm:mt-0">
                  Cancel Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointment;
