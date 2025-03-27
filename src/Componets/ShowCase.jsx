import React from 'react';

const ShowCase = () => {
  return (
    <section id="Hero-section" className=" py-10 font-outfit">
    <div className="wrapper bg-primary rounded-lg mx-auto flex items-center justify-between px-8">
      {/* Left Section */}
      <div className="w-full max-w-[717px] flex flex-col gap-4 ml-20">
        <h1 className="text-5xl leading-tight font-bold text-white">
          Book Appointment <br />With Trusted Doctors
        </h1>
        <div className="flex items-center gap-4">
          <img src="/images/group_profiles.png" alt="group_profiles" className="w-[112px] h-auto" />
          <p className="text-base text-white">
            Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
          </p>
        </div>
        <button className="mt-4 bg-white w-[240px] h-[63px] rounded-[2.938rem] text-secondary-200 text-lg">
          Book appointment <span>→</span>
        </button>
      </div>
  
      {/* Right Section - Hero Image */}
      <div className="w-full max-w-[882px]">
        <img src="/images/doc-header-img.svg" alt="ShowCase-image" className="w-full object-cover mt-20" />
      </div>
    </div>
  </section>
  
  );
};

export default ShowCase;
