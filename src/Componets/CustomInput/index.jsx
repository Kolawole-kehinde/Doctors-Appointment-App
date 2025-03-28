import React from 'react'

const CustomInput = ({
    name,
    type,
    label,
    placeholder,
    className
}) => {
  return (
    <div className=''>
        {label && <labe htmlFor={name}>{label}</labe>}
        <div>
            <input
            name={name}
            type={type}
            placeholder={placeholder}
             className={`w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-100 ${className}`}
            />
        </div>

    </div>
  )
}

export default CustomInput