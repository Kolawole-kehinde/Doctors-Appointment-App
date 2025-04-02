import React, { useState } from "react";
import { registerLists } from "../../constant/auth";
import CustomInput from "../../Componets/CustomInput";
import { useForm } from "react-hook-form";
import { registerSchema } from "../../schema/authSchema";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import { signUpApi } from "../../services/auth";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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

  const onSubmit = async (data) => {
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    setLoading(true);

    try {
      const res = await signUpApi(payload);
      console.log("User registered:", res);

      toast.success("User registered successfully!");
      reset();
      navigate("/profile"); // Corrected navigation

    } catch (error) {
      console.error("Registration error:", error.message);
      toast.error(error.message); // Show error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-outfit text-secondary-300">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-[26px] font-semibold mb-2">Create Account</h2>
        <p className="text-lg font-normal mb-3">
          Please sign up to book an appointment
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {registerLists?.map(({ name, type, label }) => (
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
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded cursor-pointer hover:scale-105 transition-all"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="text-primary text-base hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
