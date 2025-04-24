import { useState, useEffect } from "react";
import { supabase } from "../libs/supabase";
import toast from "react-hot-toast";
import { useProfilePictureUpload } from "../hooks/useProfilePictureUpload";

export const useProfile = (userId) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    profilePicture: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    preview: profilePicturePreview,
    loading: imageUploading,
    error: imageUploadError,
    handleProfilePictureChange,
  } = useProfilePictureUpload(userId, (url) => {
    setFormData((prev) => ({ ...prev, profilePicture: url }));
  });

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

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('users').update(formData).eq('id', userId);
    if (error) {
      setError(error.message);
      toast.error('Error updating profile.');
    } else {
      setError(null);
      toast.success('Profile updated successfully!');
    }
    setLoading(false);
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match.');
      setLoading(false);
      return;
    }

    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    const email = sessionData?.session?.user?.email;

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password: passwordData.currentPassword,
    });

    if (signInError) {
      toast.error('Current password is incorrect.');
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({ password: passwordData.newPassword });
    if (error) {
      setError(error.message);
      toast.error('Error changing password.');
    } else {
      setError(null);
      toast.success('Password updated successfully!');
    }
    setLoading(false);
  };

  return {
    formData,
    passwordData,
    loading: loading || imageUploading,
    error: error || imageUploadError,
    profilePicturePreview,
    handleChange,
    handlePasswordChange,
    handleProfilePictureChange,
    handleSubmitProfile,
    handleSubmitPassword,
  };
};