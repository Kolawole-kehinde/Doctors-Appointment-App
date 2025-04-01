import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router";

const CustomButton = () => {
  // const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);
  const navigate = useNavigate();
  return (
    <div className="hidden md:block">
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
  );
};

export default CustomButton;
