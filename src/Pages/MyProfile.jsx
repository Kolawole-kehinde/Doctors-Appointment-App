import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import CustomInput from "../Components/CustomInput";

const MyProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");

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
              <form className="space-y-5 bg-white border rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-2">Profile Details</h2>

                <CustomInput label="Full Name" placeholder="Full Name" />
                <CustomInput label="Phone Number" placeholder="Phone Number" />
                <CustomInput label="Email" type="email" placeholder="Email" />
                <CustomInput
                  label="Delivery Address"
                  placeholder="Delivery Address"
                />

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
              <form className="space-y-5 bg-white border rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-2">Change Password</h2>

                <CustomInput
                  label="Current Password"
                  type="password"
                  placeholder="Current password"
                />

                <CustomInput
                  label="New Password"
                  type="password"
                  placeholder="Enter new password"
                />

                <CustomInput
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm password"
                />

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
