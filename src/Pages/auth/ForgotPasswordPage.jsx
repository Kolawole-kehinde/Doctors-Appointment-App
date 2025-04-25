
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { z } from 'zod';
import { supabase } from '../../libs/supabase';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';


const forgotSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false);

  const { register,
    handleSubmit, 
    formState } = useForm({
    resolver: zodResolver(forgotSchema),
  });

  const { errors } = formState || {};  // Safeguard to ensure `errors` is not undefined

  const onSubmit = async ({ email }) => {
    setLoading(true);
    
    // Update the redirect URL to your production domain
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `https://doctors-appointment-app-alpha.vercel.app/auth/reset-password`,
    });
  
    if (error) {
      toast.error("Failed to send reset link. Please try again.");
    } else {
      toast.success("A reset link has been sent.");
    }
  
    setLoading(false);
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="max-w-md mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg space-y-4"
    >
      <h2 className="text-xl font-semibold">Forgot Password</h2>
      <p className="text-gray-600">Enter your registered email address</p>

      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded"
        {...register("email")}
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

      <button
        type="submit"
        className="w-full bg-primary text-white py-2 rounded hover:scale-105 transition"
        disabled={loading}
      >
        {loading ? "Sending..." : "Send Reset Link"}
      </button>
    </form>
  );
};

export default ForgotPasswordPage;
