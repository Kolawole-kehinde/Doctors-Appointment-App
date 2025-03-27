import React from 'react';
import { doctorsData } from '../constant/doctors';

const TopDoctors = () => {
  const topDoctors = doctorsData?.slice(0, 8);
  return (
    <section className="wrapper py-5 font-outfit">
      <div className="flex flex-col items-center gap-4 text-gray-900 md:mx-10">
        <h1 className="text-[2.5rem] font-medium text-primary-100">
          Top Doctors to Book
        </h1>
        <p className="text-lg leading-7 text-secondary-300">
          Simply browse through our extensive list of trusted doctors.
        </p>

        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5 sm:px-0">
          {topDoctors.map(({ id, image, name, speciality }) => (
            <div
              key={id}
              className="border border-blue-200  rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-transform duration-500"
            >
              <img src={image} alt={`${name}'s profile`} className="bg-blue-50" />
              
              <div className="flex items-center gap-2 py-1 px-3 text-lg text-green-500">
                <span className="w-2 h-2 bg-green-500 rounded-full" aria-hidden="true"></span>
                <p>Available</p>
              </div>

              <p className="text-primary-100 text-xl font-medium px-3">{name}</p>
              <p className="text-sm text-gray-700 px-3 pb-4">{speciality}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopDoctors;
