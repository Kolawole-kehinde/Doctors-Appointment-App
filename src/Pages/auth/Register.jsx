import React from 'react';
import { Link } from 'react-router';

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Registration Page</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100"
              placeholder="Enter your password"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-200 transition-all"
          >
            Register
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
          Already have an account? <Link to="/auth/login" className="text-primary hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
