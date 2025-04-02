import React, { useState } from 'react';
import { loginLists } from '../../constant/auth';
import CustomInput from '../../Componets/CustomInput';
import { useForm } from 'react-hook-form';
import { loginSchema } from '../../schema/authSchema';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router';
import { supabase } from '../../libs/supabase';

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "", 
      password: "", 
    },
  });

  const onSubmit = async (data) => {
    const { email, password } = data; 

    setLoading(true); 

    try {
      const { user, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        toast.error(error.message);
        setLoading(false); 
      } else {
        toast.success("Login Successful");
        navigate("/profile"); 
        setLoading(false);
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again."); 
      setLoading(false); 
    }

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md mx-auto mt-20 p-6 shadow-lg rounded-lg bg-white text-secondary-300">
      <h2 className="text-[26px] font-semibold">Login</h2>
      <p className='text-lg font-normal mb-3'>Please login to book appointment</p>

      {loginLists?.map(({ name, type, label }) => (
        <CustomInput
          key={name}
          name={name}
          type={type}
          label={label}
          register={register}
          errors={errors[name]?.message}
        />
      ))}

      <button
        type="submit"
        disabled={loading} 
        className="w-full bg-primary text-white py-2 px-4 rounded hover:scale-105 transition-all"
      >
        {loading ? "Logging in..." : "Login"} 
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
