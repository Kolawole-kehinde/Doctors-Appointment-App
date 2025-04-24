// src/hooks/useChangePassword.js
import { useState } from 'react';
import { supabase } from '../libs/supabase';
import toast from 'react-hot-toast';

export const useChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = values;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return toast.error("All fields are required.");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("New passwords do not match.");
    }

    setLoading(true);
    const {
      data: { user },
      error: authError
    } = await supabase.auth.getUser();

    if (authError || !user) {
      toast.error("User not found.");
      setLoading(false);
      return;
    }

    // Re-authenticate using current password
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword
    });

    if (signInError) {
      toast.error("Current password is incorrect.");
      setLoading(false);
      return;
    }

    // Update password
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (updateError) {
      toast.error("Failed to update password.");
    } else {
      toast.success("Password updated successfully!");
    }

    setLoading(false);
  };

  return {
    values,
    handleChange,
    handleSubmit,
    loading
  };
};
