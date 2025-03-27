import React from "react";
import { IoMenu } from "react-icons/io5";
import { NavLink } from "react-router";
import { navRoutes } from "../../constant/NavRoutes";
import { useState } from "react";
import Logo from "./logo";
import { IoMdClose } from "react-icons/io";
import CustomButton from "../CustomButton";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const active = (isActive) => {
    return isActive ? "text-primary" : "text-gray-500";
  };
  const toggleMenu = () => {
    setMenuOpen((preState) => !preState);
  };

  return (
    <header className="py-4">
      <nav className="wrapper flex items-center justify-between px-4 md:px-0 border-b border-secondary-100">
        <Logo />
        <IoMenu
          fontSize={30}
          className="block md:hidden"
          onClick={toggleMenu}
        />
        <menu className="hidden md:flex items-center font-poppins gap-[1.25rem] text-base leading-[24px] font-medium text-center uppercase">
          {navRoutes?.map(({ id, name, path }) => (
            <li key={id}>
              <NavLink to={path} className={({ isActive }) => active(isActive)}>
                {name}
              </NavLink>
            </li>
          ))}
        </menu>

        <CustomButton />
      </nav>

      {menuOpen && (
        <nav className="w-full h-[300px] bg-white rounded-b-3xl fixed inset-0 z-40 p-4 text-black">
          <div className="flex items-center justify-between ">
            <Logo />
            <button onClick={toggleMenu}>
              <IoMdClose fontSize={30} />
            </button>
          </div>

          <menu className="flex flex-col gap-2 p-2 text-lg">
            {navRoutes?.map(({ id, name, path }) => (
              <li key={id}>
                <NavLink
                  to={path}
                  className={({ isActive }) => active(isActive)}
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </menu>
          <div className="font-outfit text-lg leading-[43px] text-white ">
            <button className="w-full px-8 py-1 bg-primary  rounded">
              Create account
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
