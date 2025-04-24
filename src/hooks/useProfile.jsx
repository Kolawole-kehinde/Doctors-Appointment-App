import { useState, useEffect } from "react";
import { supabase } from "../libs/supabase";
import toast from "react-hot-toast";
import { imageUploadToServer } from "../services/imageUploadToServer"; // Import the image upload function

export const useProfile = (userId) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    profilePicture: '', // Store the profile picture URL
  });
  const [profilePicturePreview, setProfilePicturePreview] = useState(''); // State for image preview
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user data from the database
  useEffect(() => {
    if (!userId) return;

    const fetchUserData = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('users').select('*').eq('id', userId).single();
      if (error) {
        setError(error.message);
      } else {
        setFormData(data || {});
        if (data?.profilePicture) {
          setProfilePicturePreview(data.profilePicture);
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, [userId]);

  // Handle form changes for profile and password
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePasswordChange = (e) => {
    setPasswordData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle profile picture upload and preview
  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a preview of the image
      const previewUrl = URL.createObjectURL(file);
      setProfilePicturePreview(previewUrl); // Set the preview state

      setLoading(true);
      try {
        const url = await imageUploadToServer(file); // Use the image upload function
        // Update the profile picture URL in the database
        const { error } = await supabase
          .from('users')
          .update({ profilePicture: url })
          .eq('id', userId);

        if (error) throw error;

        // Update the form data with the new image URL
        setFormData((prev) => ({ ...prev, profilePicture: url }));
        toast.success("Profile picture updated successfully!");
      } catch (uploadError) {
        setError(uploadError.message);
        toast.error("Failed to upload profile picture.");
      }
      setLoading(false);
    }
  };

  // Handle profile form submission
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

  // Handle password form submission
  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
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
    loading,
    error,
    profilePicturePreview, // Return the image preview state
    handleChange,
    handlePasswordChange,
    handleProfilePictureChange,
    handleSubmitProfile,
    handleSubmitPassword,
  };
};
