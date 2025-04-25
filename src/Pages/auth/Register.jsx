import React, { useContext, useState, useEffect } from "react";
import { registerLists } from "../../constant/auth";
import CustomInput from "../../Components/CustomInput";
import { useForm } from "react-hook-form";
import { registerSchema } from "../../schema/authSchema";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpApi } from "../../services/auth";
import { AppContext } from "../../context/AppContext";
import { Link, useNavigate } from "react-router";
import { getPasswordStrength } from "../../utils/passwordStrength";

const RegisterPage = () => {
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");

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

  useEffect(() => {
    setPasswordStrength(getPasswordStrength(passwordValue));
  }, [passwordValue]);

  const onSubmit = async (data) => {
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    setLoading(true);
    try {
      const res = await signUpApi(payload);
      toast.success("User registered successfully!");
      setUser(res);
      reset();
      navigate("/profile");
    } catch (error) {
      toast.error(error.message);
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
          {registerLists.map(({ name, type, label }) => (
            <div key={name}>
              <CustomInput
                type={type}
                name={name}
                label={label}
                register={register}
                errors={errors[name]?.message}
                onChange={
                  name === "password"
                    ? (e) => setPasswordValue(e.target.value)
                    : undefined
                }
              />
              {name === "password" && passwordValue && (
                <p
                  className={`text-sm mt-1 ${
                    passwordStrength === "Strong"
                      ? "text-green-600"
                      : passwordStrength === "Medium"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  Strength: {passwordStrength}
                </p>
              )}
            </div>
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
