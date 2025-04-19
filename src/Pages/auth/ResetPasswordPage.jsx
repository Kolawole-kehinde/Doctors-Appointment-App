import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { supabase } from '../../libs/supabase';
import CustomInput from '../../Components/CustomInput';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Check if the URL contains the access token when the page loads
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash.includes('access_token')) {
      toast.error('Invalid or missing token.');
      navigate('/auth/forgot-password');
    }
  }, [navigate]);

  const handleReset = async () => {
    // Validate that passwords match
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      // Make sure to update the password using the access token from the URL
      const token = new URLSearchParams(window.location.hash).get('access_token');
      if (!token) {
        toast.error('Invalid or missing access token.');
        return;
      }

      const { error } = await supabase.auth.updateUser({ password }, { access_token: token });
      if (error) throw error;

      toast.success('Password updated! Please log in.');
      navigate('/auth/password-success');
    } catch (error) {
      toast.error(error.message || 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg space-y-4">
      <h2 className="text-xl font-semibold text-center">Reset Password</h2>

      <CustomInput
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        name="password"
      />

      <CustomInput
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        name="confirmPassword"
      />

      <button
        onClick={handleReset}
        className="w-full bg-primary text-white py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Updating...' : 'Update Password'}
      </button>
    </div>
  );
};

export default ResetPasswordPage;
