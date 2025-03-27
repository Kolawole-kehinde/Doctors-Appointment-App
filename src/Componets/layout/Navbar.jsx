import React from 'react';
import { IoMenu } from 'react-icons/io5';
import { NavLink } from 'react-router';
import { navRoutes } from '../../constant/NavRoutes';

const Navbar = () => {
  const active =(isActive) => {
    return isActive ? "text-primary" : "text-gray-500";
  }
  return (
    <header className="py-4">
      
        <nav className="wrapper flex items-center justify-between px-4 md:px-0 border-b border-secondary-100">
          <NavLink to="/">
            <img src="/images/logo-2.png" alt="Logo" className='size-[50px] md:size-[100px] '/>
          </NavLink>

          <IoMenu fontSize={30} className='block md:hidden' />
          <menu className="hidden md:flex items-center font-poppins gap-[1.25rem] text-base leading-[24px] font-medium text-center uppercase">
          {
            navRoutes?.map(({id, name, path}) => (
            <li key={id}>
                 <NavLink
                  to={path}
                  className={({ isActive }) => active(isActive)}
                 >
                  {name}
                 </NavLink>
            </li>

          
            ))
          }
          </menu>
          
          

          <div className='hidden md:block '>
            <button className="w-[195px] h-[54px] bg-primary font-outfit text-lg leading-[43px] text-white text-center rounded-[2.938rem]">
              Create account
            </button>
          </div>
        </nav>

        
   
    </header>
  );
};

export default Navbar;
