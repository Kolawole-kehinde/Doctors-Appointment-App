import React, { useState, useEffect, useContext } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { passwordFields } from "../constant/profileFields";
import { AppContext } from "../context/AppContext";
import CustomInput from "../Components/CustomInput";
import ActionButton from "../Components/CustomButton/ActionButoon";

const MyProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const { user, updateUserProfile } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Fetch current user data from context
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) return alert("User not logged in");

    // Update profile using context method
    await updateUserProfile(formData.address, formData.phone);
  };

  const renderForm = () => {
    if (activeTab === "password") {
      return (
        <form className="space-y-5 bg-white border rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Change Password</h2>
          {passwordFields.map((field, idx) => (
            <CustomInput
              key={idx}
              label={field.label}
              type={field.type || "text"}
              placeholder={field.placeholder}
            />
          ))}
          <div className="flex justify-end gap-4 pt-4">
            <ActionButton
              type="button"
              text="Cancel"
              className="text-primary hover:bg-green-50 border border-primary"
            />
            <ActionButton
              type="submit"
              text="Update"
              className="bg-primary text-white hover:bg-blue-700"
            />
          </div>
        </form>
      );
    }

    // Profile form
    return (
      <form onSubmit={handleSubmit} className="space-y-5 bg-white border rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Profile Details</h2>

        <CustomInput
          label="Name"
          name="name"
          type="text"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
        />
        <CustomInput
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />
        <CustomInput
          label="Phone"
          name="phone"
          type="text"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={handleChange}
        />
        <CustomInput
          label="Address"
          name="address"
          type="text"
          placeholder="Enter your address"
          value={formData.address}
          onChange={handleChange}
        />

        <div className="flex justify-end gap-4 pt-4">
          <ActionButton
            type="button"
            text="Cancel"
            className="text-primary hover:bg-green-50 border border-primary"
          />
          <ActionButton
            type="submit"
            text="Update"
            className="bg-primary text-white hover:bg-blue-700"
          />
        </div>
      </form>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-20 font-outfit">
      <div className="bg-white max-w-5xl mx-auto rounded-lg shadow-md overflow-hidden">
        <div className="bg-gray-200 h-24 relative flex flex-col justify-center items-center">
          <label className="relative z-10">
            <input type="file" accept="image/*" className="hidden" />
            <div className="relative w-32 h-32 -mb-16">
              <img
                src="https://via.placeholder.com/150"
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
              />
              <div className="absolute bottom-1 right-1 bg-white border-2 border-green-600 rounded-full p-1">
                <FaUser className="w-4 h-4 text-black" />
              </div>
            </div>
          </label>
        </div>

        <div className="mt-16 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold text-gray-900">{user?.name}</h2>
          <p className="text-gray-700">{user?.email}</p>
        </div>

        <div className="pt-20 px-6 pb-6 grid md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <ul className="rounded-lg overflow-hidden shadow-md border border-gray-200">
              {["profile", "password"].map((tab) => (
                <li
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-2 px-4 py-3 cursor-pointer ${
                    activeTab === tab
                      ? "text-blue-600 bg-white font-semibold rounded-b-xl border-b-2 border-primary"
                      : "text-black bg-white hover:bg-gray-100 border-b border-gray-200"
                  }`}
                >
                  {tab === "profile" ? <FaUser /> : <FaLock />}
                  {tab === "profile" ? "Profile Details" : "Change Password"}
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-3">{renderForm()}</div>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
