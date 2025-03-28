import React from 'react'
import { useNavigate } from 'react-router'

const CustomButton = () => {
  const navigate = useNavigate();
  return (
    <div onClick={() =>navigate("/auth/register")} className='hidden md:block '>
    <button className="w-[195px] h-[54px] bg-primary font-outfit text-lg leading-[43px] text-white text-center rounded cursor-pointer outline-none hover:scale-105 transition-all">
      Create account
    </button>
  </div>
  )
}

export default CustomButton