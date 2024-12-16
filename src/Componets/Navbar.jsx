import React from 'react'
import logo from '../assets/prescripto-logo.svg'

const Navbar = () => {
  return (
   <header className='py-4'>
    <div className='wrapper'>
      <nav className='flex items-center justify-between'>
         <div>
            <img src={logo} alt="" />
         </div>
         <div>
           <menu className='font-poppins flex items-center gap-[1.25rem] text-base leading-[24px] font-medium text-center'>
             <li>HOME</li>
             <li>ALL DOCTORS</li>
             <li>ABOUT</li>
             <li>CONTACT</li>
           </menu>
         </div>
         <div>
           <button className='w-[195px] h-[54px] bg-primary font-outfit text-lg leading-[43px] text-white text-center rounded-[2.938rem]'>Create account</button>
         </div>
      </nav>
      <div className='w-full h-[1px] bg-secondary-100 mt-4'>

      </div>
      </div>
   </header>
  )
}

export default Navbar