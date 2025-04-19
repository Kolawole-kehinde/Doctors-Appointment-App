// ResetPasswordPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../../libs/supabase';
import toast from 'react-hot-toast';


const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (password !== confirm) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      toast.error("Reset failed.");
    } else {
      toast.success("Password updated! Please log in.");
      navigate("/auth/login");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg space-y-4">
      <h2 className="text-xl font-semibold text-center">Reset Password</h2>

      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <button
        onClick={handleReset}
        className="w-full bg-primary text-white py-2 rounded"
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Password"}
      </button>
    </div>
  );
};

export default ResetPasswordPage;
