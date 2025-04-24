import { useState } from "react";
import { supabase } from "../libs/supabase";
import toast from "react-hot-toast";
import { imageUploadToServer } from "../services/imageUploadToServer";

export const useProfilePictureUpload = (userId, onSuccess) => {
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    setLoading(true);
    try {
      const url = await imageUploadToServer(file);
      const { error } = await supabase
        .from('users')
        .update({ profilePicture: url })
        .eq('id', userId);

      if (error) throw error;

      toast.success("Profile picture updated successfully!");
      if (onSuccess) onSuccess(url); // Callback to update parent state
    } catch (uploadError) {
      setError(uploadError.message);
      toast.error("Failed to upload profile picture.");
    }
    setLoading(false);
  };

  return {
    preview,
    loading,
    error,
    handleProfilePictureChange,
  };
};
