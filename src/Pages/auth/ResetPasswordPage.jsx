import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CustomInput from '../../Components/CustomInput';
import { supabase } from '../../libs/supabase';
import { useNavigate } from 'react-router';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Check for valid session from reset link
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error('Unauthorized. Please use the reset link sent to your email.');
        navigate('/login');
      }
    };

    checkSession();
  }, [navigate]);

  const handleReset = async () => {
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        toast.error('Session expired or invalid. Please open the reset link from your email again.');
        return;
      }

      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        console.error('Update error:', error); // optional: for debugging
        throw error;
      }

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
      />

      <CustomInput
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
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
