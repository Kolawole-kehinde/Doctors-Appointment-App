import React from "react";

const ShowCase = () => {
  return (
    <section className=" font-outfit px-4 lg:px-0">
      <div className="wrapper bg-primary flex flex-col-reverse  md:flex-row flex-wrap rounded-lg px-6 md:px-10 lg:px-20">
        {/* Left Section */}
        <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 m-auto py-20 md:mb-[30px]">
          <h1 className="text-3xl md:text-4xl lg:text-5xl leading-tight lg:leading-[70px] font-semibold text-white">
            Book Appointment <br /> 
            With Trusted Doctors
          </h1>
          <div className="flex flex-col md:flex-row items-center gap-3 mb-6 text-white text-sm font-light">
            <img
              src="/images/group_profiles.png"
              alt="group_profiles"
              className="w-28 hidden md:block"
            />
            <p>
              Simply browse through our extensive list of trusted doctors,{" "}
              <br className="hidden sm:block" /> schedule your appointment
              hassle-free.
            </p>
          </div>
          <a
            href="#Speciality"
            className=" flex items-center gap-2 bg-white px-8 py-3 rounded text-secondary-200 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300"
          >
            Book appointment <span className="text-lg">→</span>
          </a>
        </div>

        {/* Right Section - Hero Image */}
        <div className="md:w-1/2 relative">
          <img
            src="/images/show2.png"
            alt="ShowCase-image"
            className="w-full md:absolute bottom-0 h-auto rounded-lg "
          />
        </div>
      </div>
    </section>
  );
};

export default ShowCase;
