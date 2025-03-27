import React from 'react';
import { NavLink } from 'react-router';

const Navbar = () => {
  return (
    <header className="py-4">
      <div className="wrapper">
        <nav className="flex items-center justify-between">
          <NavLink to="/">
            <img src="/images/prescripto-logo.svg" alt="Logo" />
          </NavLink>

          <div>
            <ul className="font-poppins flex items-center gap-[1.25rem] text-base leading-[24px] font-medium text-center">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? 'text-primary' : 'text-gray-500'
                  }
                >
                  HOME
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/doctors"
                  className={({ isActive }) =>
                   isActive ? 'text-primary' : 'text-gray-500'
                  }
                >
                  ALL DOCTORS
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                   isActive ? 'text-primary' : 'text-gray-500'
                  }
                >
                  ABOUT
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                   isActive ? 'text-primary' : 'text-gray-500'
                  }
                >
                  CONTACT
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <button className="w-[195px] h-[54px] bg-primary font-outfit text-lg leading-[43px] text-white text-center rounded-[2.938rem]">
              Create account
            </button>
          </div>
        </nav>

        <div className="w-full h-[1px] bg-secondary-100 mt-4"></div>
      </div>
    </header>
  );
};

export default Navbar;
