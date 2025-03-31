import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router";
import Logo from "./logo";
import CustomButton from "../CustomButton";
import Menu from "./Menu";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
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
        <Menu menuStyle="hidden lg:flex items-center font-poppins gap-[1.25rem] text-base leading-[24px] font-medium text-center uppercase" />
        <CustomButton />
      </nav>

      {menuOpen && (
        <nav className="w-full h-[300px] bg-white rounded-b-3xl fixed inset-0 z-40 p-4 text-black">
          <div className="flex items-center justify-between">
            <Logo />
            <button onClick={toggleMenu}>
              <IoMdClose fontSize={30} />
            </button>
          </div>

          <Menu menuStyle="flex flex-col gap-2 p-2 text-lg" toggleMenu={toggleMenu} />

          <div className="font-outfit text-lg leading-[43px] text-white mt-4">
            <button
              onClick={() => {
                navigate('/auth/register');
                setMenuOpen(false);
              }}
              className="w-full px-8 py-1 bg-primary rounded cursor-pointer outline-none hover:scale-105 transition-all"
            >
              Create account
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
