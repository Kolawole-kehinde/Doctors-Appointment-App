import React from 'react';
import { Link } from 'react-router';

const LoginPage = () => {
  return (
    <form className="space-y-4 w-full max-w-md mx-auto mt-20 p-6 shadow-lg rounded-lg bg-white">
      <div>
        <label htmlFor="email" className="block text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-200 transition-all"
      >
        Login
      </button>

      <p className="text-sm text-gray-600 text-center">
        Don’t have an account?{' '}
        <Link to="/auth/register" className="text-primary hover:underline">
          Register here
        </Link>
      </p>
    </form>
  );
};

export default LoginPage;
