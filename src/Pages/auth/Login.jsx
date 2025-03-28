import React from 'react';
import { Link } from 'react-router';
import { loginLists } from '../../constant/auth';
import CustomInput from '../../Componets/CustomInput';

const LoginPage = () => {
  return (
    <form className="space-y-4 w-full max-w-md mx-auto mt-20 p-6 shadow-lg rounded-lg bg-white text-secondary-300">
      <h2 className="text-[26px] font-semibold ">Login</h2>
      <p className='text-lg font-normal mb-3'>Please login to book appointment</p>
      {
       loginLists?.map(({name, type, label, placeholder}) => (
        <CustomInput
        key={name}
        name={name}
        type={type}
        label={label}
        placeholder={placeholder}
        />

       )) 
      }
      

      <button
        type="submit"
        className="w-full bg-primary text-white py-2 px-4 rounded hover:scale-105 transition-all"
      >
        Login
      </button>

      <p className="text-sm text-gray-600 text-center">
        Don’t have an account?{' '}
        <Link to="/auth/register" className="text-primary text-base hover:underline">
          Register here
        </Link>
      </p>
    </form>
  );
};

export default LoginPage;
