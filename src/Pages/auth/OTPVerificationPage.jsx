// OTPVerificationPage.jsx
import React, { useState } from 'react';
import { supabase } from '../../libs/supabase';
import toast from 'react-hot-toast';


const OTPVerificationPage = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1 = enter phone, 2 = enter OTP
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ phone });

    if (error) {
      toast.error("Failed to send OTP.");
    } else {
      toast.success("OTP sent to your phone.");
      setStep(2);
    }
    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token: otp,
      type: 'sms',
    });

    if (error) {
      toast.error("Invalid OTP.");
    } else {
      toast.success("OTP verified. You can now reset your password.");
      // Optionally redirect to password reset
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg space-y-4">
      <h2 className="text-xl font-semibold text-center">
        {step === 1 ? "Enter Phone Number" : "Enter OTP"}
      </h2>

      {step === 1 ? (
        <>
          <input
            type="tel"
            placeholder="+1234567890"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
