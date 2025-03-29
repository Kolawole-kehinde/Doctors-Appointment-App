import React from 'react'
import { Link, useNavigate } from 'react-router'

const Banner = () => {
   const navigate = useNavigate
  return (
 <section className='px-4 lg:px-0'>
        <div className='wrapper bg-primary flex rounded-xl px-6 sm:px-10 md:px-14 lg:px-12 my-10 md:my-15 font-outfit '>
            
            <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
               <div className='text-xl sm:text-2xl md:text-3xl  lg:text-5xl font-bold text-white'>
               <p>Book Appointment </p>
               <p className='mt-4'>With 100+ Trusted Doctors</p>
              
               <button onClick={() => navigate('/auth/login')} className='bg-secondary w-[214px] h-[60px] text-primary font-normal text-xl mt-6 rounded cursor-pointer outline-none hover:scale-105 transition-all'>Create account</button>
            
               
               </div>
            </div>
             <div className='hidden md:block md:w-1/2 lg:w-[380px] relative'>
                <img src="/images/banner.svg" alt="bannerImg" className='absolute w-[700px] bottom-0 right-0 max-w-md' />
             </div>
        
        </div>
        </section>
  )
}

export default Banner
