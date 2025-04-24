import React from 'react';
import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const CustomInput = ({
  name,
  type,
  label,
  placeholder,
  value,
  onChange,
  className,
  register = () => {},
  errors,
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => {
        setShowPassword((prev) => !prev)
    }


  return (
    <div className="">
      {label && <label htmlFor={name}>{label}</label>} 
      <div className='relative'>
      <input
  name={name}
  id={name}
  type={showPassword && type === "password" ? "text" : type}
  placeholder={placeholder}
  {...(register ? register(name) : {})}
  value={value}
  onChange={onChange}
  className={`w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-100 ${className}`}
/>

         {type === "password" && (
          <div className=" absolute top-1/2 right-2 -translate-y-1/2" onClick={togglePassword}> 
            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </div>
        )}
      </div>
      {errors && <p className="text-red-500 text-sm">{errors}</p>}
    </div>
  );
};

export default CustomInput;
