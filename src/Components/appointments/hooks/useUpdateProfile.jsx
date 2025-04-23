import { useState } from 'react';
import toast from 'react-hot-toast';
import { imageUploadToServer } from '../../../services/imageUploadToServer';
import { useAuth } from '../../../hooks/useAuth';
import { supabase } from '../../../libs/supabase';


const useUpdateProfile = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const { user, setUser } = useAuth(); 

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageRemove = () => {
    setImage(null);
    setImagePreview("");
  };

  const updateProfile = async (data) => {
    try {
      // Upload image if there's a new one
      let imageUrl = null;
      if (image) {
        imageUrl = await imageUploadToServer(image);
        if (!imageUrl) {
          toast.error("Image upload failed");
          return;
        }
      }

      const { error } = await supabase
        .from("users")
        .update({
          name: data.name,
          email: data.email,
        //   phoneNumber: data.phoneNumber, // ✅ Added phoneNumber
          profilePicture: imageUrl || user.profilePicture,
        })
        .eq("id", user.id);

      if (error) {
        toast.error("Failed to update profile");
        console.error("Supabase Error:", error.message);
        return;
      }

      toast.success("Profile updated successfully!");

 // Re-fetch the updated user data
 const { data: updatedUser, error: fetchError } = await supabase
 .from("users")
 .select("*")
 .eq("id", user.id)
 .single();

if (fetchError) {
 console.error("Failed to fetch updated user:", fetchError.message);
} else {
 if (setUser) {
   setUser(updatedUser); // ✅ Set updated user in context
 }
 console.log("Updated user:", updatedUser);
}
      // Proceed with profile update logic here
      // e.g., send imageUrl and other data to backend

    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Profile update failed");
    }
  };

  return {
    image,
    imagePreview,
    handleImageChange,
    handleImageRemove,
    updateProfile
  };
};

export default useUpdateProfile;
