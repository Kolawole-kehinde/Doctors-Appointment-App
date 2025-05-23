import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router";

const RelatedDoctors = ({ specialty, docId }) => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [relDocs, setRelDocs] = useState([]);

  useEffect(() => {
    if (doctors?.length > 0 && specialty) {
      const filteredDocs = doctors
        .filter((doc) => doc.specialty === specialty && doc.id !== docId)
        .slice(0, 4); // Show top 4 related doctors
      setRelDocs(filteredDocs);
    }
  }, [doctors, specialty, docId]);

  return (
    <div className="flex flex-col items-center text-center text-gray-900 md:mx-10 mt-10">
      {/* Title & Description */}
      <h1 className="text-2xl md:text-[2.5rem] font-medium text-primary-100">
        Related Doctors
      </h1>
      <p className="text-lg leading-7 text-secondary-300">
        Simply browse through our extensive list of trusted doctors.
      </p>

      {/* Doctors List */}
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5 sm:px-0">
        {relDocs.map(({ id, image_url, name, specialty }) => (
          <div
            key={id}
            onClick={() => {
              navigate(`/appointment/${id}`);
              scrollTo(0, 0);
            }}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-transform duration-500"
          >
            <img
              src={image_url}
              alt={`${name}'s profile`}
              className="bg-blue-50 w-full h-auto object-cover"
            />

            <div className="flex items-center gap-2 px-3 pt-2 text-lg text-green-500">
              <span className="w-2 h-2 bg-green-500 rounded-full" aria-hidden="true"></span>
              <p>Available</p>
            </div>
            <div className="flex flex-col items-start px-3">
              <p className="text-primary-100 text-base lg:text-xl font-medium">
                {name}
              </p>
              <p className="text-sm text-gray-700 pb-4">{specialty}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Fallback */}
      {relDocs.length === 0 && (
        <p className="text-sm text-gray-400 mt-4">No related doctors found.</p>
      )}
    </div>
  );
};

export default RelatedDoctors;
