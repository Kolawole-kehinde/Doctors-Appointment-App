import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { IoIosArrowDown, IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router";
import Logo from "./logo";
import Menu from "./Menu";
  
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [token, setToken] = useState(true);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  return (
    <header className="py-4 md:px-4 lg:px-0">
      <nav className="wrapper flex items-center justify-between px-4 md:px-0 border-b border-secondary-100">
        <Logo />
       
        <Menu menuStyle="hidden lg:flex items-center font-poppins gap-[1.25rem] text-base leading-[24px] font-medium text-center uppercase" />
       <div className="flex items-center gap-2">
         <div className="">
            {token ? (
              <div className="flex items-center gap-2 cursor-pointer group relative">
                <img src="/images/khennycool.jpeg" alt="profile-pic"  className="w-8 rounded-full"/>
                <IoIosArrowDown fontSize={20}/>
                  <div className="absolute right-0 top-0 pt-14 text-base font-medium text-secondary-200 z-20  hidden group-hover:block">
                     <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-2 p-4 capitalize">
                         <p onClick={() => navigate('profile')} className="hover:text-black cursor-pointer">my Profile</p>
                         <p onClick={() => navigate('my-appointment')} className="hover:text-black cursor-pointer">my Appointment</p>
                         <p onClick={() => setToken(false)} className="hover:text-black cursor-pointer">Logout</p>
                     </div>
                  </div>
              </div>
            ) : (
              <div   onClick={() => navigate("/auth/register")}
              className="hidden md:block ">
                    <button className="w-[195px] h-[54px] bg-primary font-outfit text-lg leading-[43px] text-white text-center rounded cursor-pointer outline-none hover:scale-105 transition-all">
                Create account
              </button>
              </div>
             
            )}
          </div>
        <IoMenu
          fontSize={30}
          className="block md:hidden"
          onClick={toggleMenu}
        />
       </div>
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
