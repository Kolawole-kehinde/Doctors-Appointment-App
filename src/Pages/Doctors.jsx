import React, { useContext, useMemo, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router";

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const [showFilter, setShowFilter] = useState(false);

  // Memoize filtered doctors for better performance
  const filteredDoctors = useMemo(() => {
    return speciality
      ? doctors.filter((doc) => doc.speciality.toLowerCase() === speciality.toLowerCase())
      : doctors;
  }, [doctors, speciality]);

  const specialties = [
    "General Physician",
    "Gynecologist",
    "Dermatologist",
    "Cardiologist",
    "Pediatrician",
    "Neurologist",
  ];

  const handleSpecialtyClick = (item) => {
    navigate(speciality === item ? "/doctors" : `/doctors/${item}`);
    setShowFilter(false); // Close filter menu after selection
  };

  return (
    <div className="wrapper px-4 lg:px-0 font-outfit text-secondary-300 mt-5">
      <h4 className="text-xl leading-[27px]">Browse through the doctors' specialties.</h4>

      <div className="flex flex-col md:flex-row items-start gap-5 mt-10">
        {/* Filter Button for Mobile */}
        <button
          onClick={() => setShowFilter((prev) => !prev)}
          className={`py-1 px-3 border rounded text-sm transition-all md:hidden ${
            showFilter ? "bg-primary text-white" : ""
          }`}
          aria-label="Toggle filters"
        >
          Filters
        </button>

        {/* Specialty Filter */}
        <div
          className={`w-full md:w-[200px] flex flex-col gap-4 text-base text-secondary-300 text-center md:text-start ${
            showFilter ? "flex" : "hidden md:flex"
          }`}
        >
          {specialties.map((item) => (
            <p
              key={item}
              onClick={() => handleSpecialtyClick(item)}
              className="w-full md:w-[200px] p-2 border border-gray-300 rounded transition-all cursor-pointer hover:bg-gray-100"
            >
              {item}
            </p>
          ))}
        </div>

        {/* Display Filtered Doctors */}
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filteredDoctors.map(({ id, image, name, speciality }) => (
            <div
              key={id}
              onClick={() => navigate(`/appointment/${id}`)}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-transform duration-500"
              role="button"
              tabIndex="0"
            >
              <img
                src={image}
                alt={`${name}'s profile`}
                className="bg-blue-50 w-full h-auto object-cover"
              />
              <div className="flex items-center gap-2 px-3 pt-2 text-lg text-green-500">
                <span className="w-2 h-2 bg-green-500 rounded-full" aria-hidden="true"></span>
                <p>Available</p>
              </div>
              <div className="flex flex-col items-start px-3">
                <p className="text-primary-100 text-base lg:text-xl font-medium">{name}</p>
                <p className="text-sm text-gray-700 pb-4">{speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
