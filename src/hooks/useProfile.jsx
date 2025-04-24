import { useState, useEffect, useContext } from 'react';
import { supabase } from '../libs/supabase';
import toast from 'react-hot-toast';
import { AppContext } from '../context/AppContext';


export const useProfile = (userId) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setUser } = useContext(AppContext);

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

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('users').update(formData).eq('id', userId);

    if (error) {
      setError(error.message);
      toast.error('Error updating profile. Please try again.');
    } else {
      setError(null);
      toast.success('Profile updated successfully!');

      // Refetch updated user and set in context
      const { data: updatedUser, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (!fetchError && updatedUser) {
        setUser(updatedUser);
      }
    }

    setLoading(false);
  };

  return {
    formData,
    loading,
    error,
    handleChange,
    handleSubmit
  };
};
