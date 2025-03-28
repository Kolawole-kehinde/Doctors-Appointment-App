import React from 'react';
import { Link } from 'react-router';
import { loginLists } from '../../constant/auth';

const LoginPage = () => {
  return (
    <form className="space-y-4 w-full max-w-md mx-auto mt-20 p-6 shadow-lg rounded-lg bg-white text-secondary-300">
      <h2 className="text-[26px] font-semibold ">Login</h2>
      <p className='text-lg font-normal mb-3'>Please login to book appointment</p>
      {
       loginLists?.map(({name, type, label, placeholder}) => (
        <div key={name}>
        <label htmlFor="email" className="block text-gray-700">{label}</label>
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-100"
        />
      </div>

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
