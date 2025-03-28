import React from 'react';
import { Link } from 'react-router';
import { registerLists } from '../../constant/auth';
import CustomInput from '../../Componets/CustomInput';
import { useForm } from 'react-hook-form'; 
import { zodResolver } from '@hookform/resolvers/zod';  
import { registerSchema } from '../../schema/authSchema';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }, 
  } = useForm({
    resolver: zodResolver(registerSchema), 
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data) => {
    reset();
    toast.success("Registration Successfully")
    console.log(data)
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-outfit text-secondary-300">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-[26px] font-semibold mb-2">Create Account</h2>
        <p className="text-lg font-normal mb-3">Please sign up to book an appointment</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {registerLists?.map(({ name, type, label}) => (
            <CustomInput
              key={name}
              type={type}
              name={name}
              label={label}
              register={register}
              errors={errors[name]?.message}
            />
          ))}

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded cursor-pointer hover:scale-105 transition-all"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account? <Link to="/auth/login" className="text-primary text-base hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
