import React from 'react';
import { Link } from 'react-router';
import { loginLists } from '../../constant/auth';
import CustomInput from '../../Componets/CustomInput';
import { useForm } from 'react-hook-form';
import { loginSchema } from '../../schema/authSchema';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod/src/zod.js';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }, 
  } = useForm({
    resolver: zodResolver(loginSchema), 
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = (data) => {
    reset();
    toast.success("Login Successfully")
    console.log(data)
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md mx-auto mt-20 p-6 shadow-lg rounded-lg bg-white text-secondary-300">
      <h2 className="text-[26px] font-semibold ">Login</h2>
      <p className='text-lg font-normal mb-3'>Please login to book appointment</p>
      {
       loginLists?.map(({name, type, label,}) => (
        <CustomInput
        key={name}
        name={name}
        type={type}
        label={label}
        register={register}
        errors={errors[name]?.message}
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
