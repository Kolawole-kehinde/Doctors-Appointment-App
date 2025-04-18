import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router";
import SkeletonLoader from "./Skeleton";



const TopDoctors = () => {
  const { doctors, loading } = useContext(AppContext);
  const topDoctors = doctors?.slice(0, 8);
  const navigate = useNavigate();

  return (
    <section className="wrapper  md:py-5 font-outfit px-4 lg:px-0">
      <div className="flex flex-col items-center text-center md:gap-4 text-gray-900 md:mx-10">
        <h1 className="text-3xl md:text-[2.5rem] font-medium text-primary-100">
          Top Doctors to Book
        </h1>
        <p className="text-base md:text-lg leading-7 text-secondary-300">
          Simply browse through our extensive list of trusted doctors.
        </p>

        {loading ? (
          <div className="w-full pt-5">
            <SkeletonLoader count={8} />
          </div>
        ) : (
          <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5 sm:px-0">
            {topDoctors.map(({ id, image_url, name, speciality }) => (
              <div
                onClick={() => {
                  navigate(`/appointment/${id}`);
                  scrollTo(0, 0);
                }}
                key={id}
                className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-transform duration-500"
              >
                <img
                  src={image_url}
                  alt={`${name}'s profile`}
                  className="bg-blue-50 w-full h-auto object-cover"
                />
                <div className="flex items-center gap-2 px-3 pt-2 text-lg text-green-500">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  <p>Available</p>
                </div>
                <div className="flex flex-col items-start px-3">
                  <p className="text-primary-100 text-base lg:text-xl font-medium">
                    {name}
                  </p>
                  <p className="text-sm text-gray-700 pb-4">{speciality}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => {
            navigate("/doctors");
            scrollTo(0, 0);
          }}
          className="bg-secondary text-xl w-[214px] h-[60px] rounded mt-10 cursor-pointer hover:bg-primary hover:text-white transition-all duration-300"
        >
          More
        </button>
      </div>
    </section>
  );
};

export default TopDoctors;
