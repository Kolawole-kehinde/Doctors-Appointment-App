import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaUser, FaLock } from "react-icons/fa";


const MyProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const toggleShow = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-20 font-outfit">
      <div className="bg-white max-w-5xl mx-auto rounded-lg shadow-md overflow-hidden">
        {/* Avatar */}
        <div className="bg-gray-200 h-24 relative flex justify-center items-end">
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

        {/* Content */}
        <div className="pt-20 px-6 pb-6 grid md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="col-span-1">
            <ul className="rounded-lg overflow-hidden shadow-md border border-gray-200">
              <li
                onClick={() => setActiveTab("profile")}
                className={`flex items-center gap-2 px-4 py-3 cursor-pointer ${
                  activeTab === "profile"
                    ? "text-blue-600 bg-white font-semibold border-b border-gray-200"
                    : "text-black bg-white hover:bg-gray-100 border-b border-gray-200"
                }`}
              >
                <FaUser />
                Profile Details
              </li>
              <li
                onClick={() => setActiveTab("password")}
                className={`flex items-center gap-2 px-4 py-3 cursor-pointer ${
                  activeTab === "password"
                    ? "text-blue-600 bg-white font-semibold"
                    : "text-black bg-white hover:bg-gray-100"
                }`}
              >
                <FaLock />
                Change Password
              </li>
            </ul>
          </div>

          {/* Main Form */}
          <div className="col-span-3">
            {activeTab === "profile" ? (
              // Profile Form (keep existing profile fields here)
              <form className="space-y-5 bg-white border rounded-lg p-6 shadow-sm">
  <h2 className="text-xl font-semibold mb-2">Profile Details</h2>

  <div>
    <label className="block mb-1 font-medium">Full Name</label>
    <input
      type="text"
      placeholder="Full Name"
      className="w-full border border-gray-300 rounded px-3 py-2"
    />
  </div>

  <div>
    <label className="block mb-1 font-medium">Phone Number</label>
    <input
      type="text"
      placeholder="Phone Number"
      className="w-full border border-gray-300 rounded px-3 py-2"
    />
  </div>

  <div>
    <label className="block mb-1 font-medium">Email</label>
    <input
      type="email"
      placeholder="Email"
      className="w-full border border-gray-300 rounded px-3 py-2"
    />
  </div>

  <div>
    <label className="block mb-1 font-medium">Delivery Address</label>
    <input
      type="text"
      placeholder="Delivery Address"
      className="w-full border border-gray-300 rounded px-3 py-2"
    />
  </div>

  <div className="flex justify-end gap-4 pt-4">
    <button
      type="button"
      className="px-6 py-2 rounded border border-green-600 text-green-600 hover:bg-green-50 transition"
    >
      Cancel
    </button>
    <button
      type="submit"
      className="px-6 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
    >
      Update
    </button>
  </div>
</form>

            ) : (
              // Change Password Form
              <form className="space-y-5 bg-white border rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-2">Change Password</h2>

                <div>
                  <label className="block mb-1 font-medium">Current Password</label>
                  <div className="relative">
                    <input
                      type={showPassword.current ? "text" : "password"}
                      className="w-full border border-green-600 rounded px-3 py-2"
                      placeholder="Current password"
                    />
                    <span
                      onClick={() => toggleShow("current")}
                      className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
                    >
                      {showPassword.current ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block mb-1 font-medium">New Password</label>
                  <div className="relative">
                    <input
                      type={showPassword.new ? "text" : "password"}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      placeholder="Enter new password"
                    />
                    <span
                      onClick={() => toggleShow("new")}
                      className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
                    >
                      {showPassword.new ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block mb-1 font-medium">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showPassword.confirm ? "text" : "password"}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      placeholder="Confirm password"
                    />
                    <span
                      onClick={() => toggleShow("confirm")}
                      className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
                    >
                      {showPassword.confirm ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                    </span>
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    className="px-6 py-2 rounded text-green-600 hover:bg-green-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
                  >
                    Update
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
