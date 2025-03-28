import React from 'react';

const CustomInput = ({
  name,
  type,
  label,
  placeholder,
  className,
  register = () => {},
  errors, // Now expects a string (error message)
}) => {
  return (
    <div className="">
      {label && <label htmlFor={name}>{label}</label>} {/* Corrected `label` */}
      <div>
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          {...register(name)} // Properly registering with React Hook Form
          className={`w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-100 ${className}`}
        />
      </div>
      {errors && <p className="text-red-500 text-sm">{errors}</p>} {/* Display error message if exists */}
    </div>
  );
};

export default CustomInput;
