import React from 'react';

const DoctorInfo = ({ docInfo, currentSymbol }) => {
  if (!docInfo) return null;

  return (
    <div className='flex flex-col md:flex-row gap-4'>
      <div>
        <img src={docInfo.image_url} alt={docInfo.specialty} className='bg-primary w-full md:max-w-72 rounded-lg' />
      </div>
      <div className='flex-1 border border-secondary-100 rounded-lg p-8 py-7 bg-white mx-2 md:mx-0 mt-[-40px] md:mt-0'>
        <p className='flex items-center gap-2 text-2xl md:text-[36px] font-medium text-primary-100'>
          {docInfo.name}
          <img src="/images/Vector.png" alt="verified" className='size-[25px]' />
        </p>
        <div className='flex items-center gap-2 text-secondary-300 mt-2'>
          <p className='text-sm md:text-xl'>{docInfo.degree} - {docInfo.specialty}</p>
          <button className='text-base py-0.5 px-2 border rounded-full'>{docInfo.experience}</button>
        </div>
        <p className='flex items-center gap-1 text-lg font-medium text-secondary-300 mt-3'>
          About <img src="/images/info.png" alt="info-logo" className='size-[17px]' />
        </p>
        <p className='text-lg text-secondary-300 max-w-[700px] mt-1'>{docInfo.about}</p>
        <p className='text-[22px] text-secondary-300 mt-4'>
          Appointment fee: <span className='font-medium'>{currentSymbol}{docInfo.fees}</span>
        </p>
      </div>
    </div>
  );
};

export default DoctorInfo;
