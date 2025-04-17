import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router";
import Menu from "./Menu";
import { useAuth } from "../../hooks/useAuth";
import CustomButton from "../CustomButton";
import AuthMenu from "./AuthMenu";
import Logo from "../../Components/layout/logo";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  return (
    <header className="py-4 md:px-4 lg:px-0">
     
      <nav className="wrapper flex items-center justify-between px-4 md:px-0 border-b border-secondary-100">

        {/* MOBILE (when logged out) — Logo Left, Menu Right */}
        {!user && (
          <div className="flex w-full items-center justify-between md:hidden">
            <Logo />
            <IoMenu fontSize={30} onClick={toggleMenu} />
          </div>
        )}

        {/* MOBILE (when logged in) — Menu Left, Auth Right */}
        {user && (
          <div className="flex w-full items-center justify-between md:hidden">
            <IoMenu fontSize={30} onClick={toggleMenu} />
            <AuthMenu />
          </div>
        )}

        {/* DESKTOP — Hidden on mobile */}
        <div className="hidden md:flex w-full items-center justify-between">
          <Logo />
          <Menu menuStyle="hidden md:flex items-center font-poppins gap-[1.25rem] text-base leading-[24px] font-medium text-center uppercase" />
          {user ? <AuthMenu /> : <CustomButton />}
        </div>
      </nav>

      {/* MOBILE DROPDOWN MENU */}
      {menuOpen && (
        <nav className="w-full h-[325px] bg-white shadow-xl rounded-b-3xl fixed inset-0 z-40 p-4 text-black">
          <div className="flex items-center justify-between mb-4">
            <Logo />
            <button onClick={toggleMenu}>
              <IoMdClose fontSize={30} />
            </button>
          </div>

          <Menu
            menuStyle="flex flex-col gap-4 p-2 text-lg"
            toggleMenu={toggleMenu}
          />

          {!user && (
            <div className="mb-10">
              <button
                onClick={() => {
                  navigate("/auth/register");
                  setMenuOpen(false);
                }}
                className="py-2 w-full bg-primary text-white text-sm font-medium rounded mb-4 cursor-pointer outline-none hover:scale-105 transition-all"
              >
                Create account
              </button>
            </div>
          )}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
