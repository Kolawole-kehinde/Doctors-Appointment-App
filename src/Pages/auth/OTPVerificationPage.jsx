import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../../libs/supabase';
import toast from 'react-hot-toast';


const OTPVerificationPage = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1 = enter email, 2 = enter OTP
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    setLoading(true);

    // Request an OTP for the entered email
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      toast.error("Failed to send OTP.");
    } else {
      toast.success("OTP sent to your email.");
      setStep(2); // Move to OTP verification step
    }

    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    setLoading(true);

    // Verify OTP (email-based)
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'email', // Set type to 'email' for email OTP
    });

    if (error) {
      toast.error("Invalid OTP.");
    } else {
      toast.success("OTP verified. You can now reset your password.");
      navigate('auth/reset-password');  // Redirect to password reset page
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg space-y-4">
      <h2 className="text-xl font-semibold text-center">
        {step === 1 ? "Enter Your Email" : "Enter OTP"}
      </h2>

      {step === 1 ? (
        <>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            onClick={handleSendOtp}
            className="w-full bg-primary text-white py-2 rounded"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            onClick={handleVerifyOtp}
            className="w-full bg-primary text-white py-2 rounded"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </>
      )}
    </div>
  );
};

export default OTPVerificationPage;
