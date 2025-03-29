import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { AppContext } from '../context/AppContext';

const AppointmentPage = () => {
  const { docId } = useParams();
  const { doctors, currentSymbol } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);

  const fetchDocInfo = () => {
    if (doctors && doctors.length > 0) {
      const doctorInfo = doctors.find((doc) => doc.id === docId);
      setDocInfo(doctorInfo);
      console.log("Doctor Info:", doctorInfo); 
    } else {
      console.log("Doctors array is empty or not loaded yet.");
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  return docInfo && (
    <div className="wrapper font-outfit py-10 px-4 lg:px-0">
      {/* ----------------- Doctor Detail---------- */}
      <div className='flex flex-col md:flex-row gap-4'>
        <div>
          <img src={docInfo.image} alt={docInfo.speciality} className='bg-primary w-full md:max-w-72 rounded-lg' />
        </div>
          <div className='flex-1 border border-secondary-100 rounded-lg p-8 py-7 bg-white mx-2 md:mx-0 mt-[-80px] md:mt-0'>
              {/* ------------------ Doctor fullDeatails-------------------- */}
              <p className='flex items-center gap-2 text-[36px] font-medium text-primary-100'>
                {docInfo.name}
                <img src="/images/Vector.png" alt={docInfo.speciality} className='size-[25px]'/>
              </p>
               <div className='flex items-center gap-2 text-secondary-300'>
                  <p className='text-xl'>{docInfo.degree} - {docInfo.speciality}</p>
                  <button className='text-base py-0.5 px-2 border rounded-full'>{docInfo.experience}</button>
               </div>
               {/* ------------------About The Doctor------------------------- */}
               <div >
                   <p className='flex items-center gap-1 text-lg  font-medium text-secondary-300  mt-3 '>About <img src="/images/info.png" alt="info-logo" className='size-[17px]' /></p>
                   <p className='text-lg text-secondary-300 max-w-[700px] mt-1'>{docInfo.about}</p>
               </div>
                <p className='text-[22px] mt-5 text-secondary-300'>Appointment fee: <span className='font-medium text-primary-100'>{currentSymbol}{docInfo.fees}</span></p>
          </div>
      </div>
    </div>
  );
};

export default AppointmentPage;
