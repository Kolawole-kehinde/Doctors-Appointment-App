import { useEffect, useState } from "react";
import { supabase } from "../libs/supabase";
import toast from "react-hot-toast";

export const useProfile = (userId) => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      address: ''
    });
    const [passwordData, setPasswordData] = useState({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    // Fetch user profile
    useEffect(() => {
      if (!userId) return;
      const fetchUserData = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('users').select('*').eq('id', userId).single();
        if (error) {
          setError(error.message);
        } else {
          setFormData(data || {});
        }
        setLoading(false);
      };
  
      fetchUserData();
    }, [userId]);
  
    // Handle form input changes
    const handleChange = (e) => {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
  
    // Handle password input changes
    const handlePasswordChange = (e) => {
      setPasswordData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
  
    // Submit profile form
    const handleSubmitProfile = async (e) => {
      e.preventDefault();
      setLoading(true);
  
      const { error } = await supabase.from('users').update(formData).eq('id', userId);
  
      if (error) {
        setError(error.message);
        toast.error('Error updating profile. Please try again.');
      } else {
        setError(null);
        toast.success('Profile updated successfully!');
      }
      setLoading(false);
    };
  
    // Submit password change form
    const handleSubmitPassword = async (e) => {
      e.preventDefault();
      setLoading(true);
  
      // Implement your password change logic here
      // This might involve calling Supabase Auth to update the password
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      });
  
      if (error) {
        setError(error.message);
        toast.error('Error changing password. Please try again.');
      } else {
        setError(null);
        toast.success('Password changed successfully!');
      }
      setLoading(false);
    };
  
    return {
      formData,
      passwordData,
      loading,
      error,
      handleChange,
      handlePasswordChange,
      handleSubmitProfile,
      handleSubmitPassword
    };
  };
  