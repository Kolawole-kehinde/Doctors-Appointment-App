import React from "react";
import { FaLock, FaUser } from "react-icons/fa";

const MyProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-20 font-outfit">
      <div className="bg-white max-w-5xl mx-auto rounded-lg shadow-md overflow-hidden">
        {/* Avatar Background */}
        <div className="bg-gray-200 h-40 relative flex justify-center items-end">
          <label className="relative z-10">
            <input type="file" accept="image/*" className="hidden" />
            <div className="relative w-32 h-32 -mb-16">
              <img
                src="https://via.placeholder.com/150"
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
              />
              <div className="absolute bottom-1 right-1 bg-white border-2 border-primary rounded-full p-1">
                <svg
                  className="w-4 h-4 text-black"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M4 3a1 1 0 000 2h1l1 1h6l1-1h1a1 1 0 100-2H4zM3 7h14v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
                </svg>
              </div>
            </div>
          </label>
        </div>

        {/* Content Area */}
        <div className="pt-20 px-6 pb-6 grid md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="border-b pr-6 col-span-1">
          <ul className="rounded-lg overflow-hidden shadow-md border border-gray-200">
  <li className="flex items-center gap-2 px-4 py-3 bg-white text-primary rounded-b-lg border-b border-primary cursor-pointer">
    <FaUser fontSize={15} />
    <span className="font-semibold">Profile Details</span>
  </li>
  <li className="flex items-center gap-2 px-4 py-3 bg-white text-black cursor-pointer hover:bg-gray-50 transition">
    <FaLock fontSize={15}/>
    <span>Change Password</span>
  </li>
</ul>
          </div>

          {/* Form */}
          <div className="col-span-3">
            <form className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Phone Number</label>
                <input
                  type="text"
                  placeholder="Enter your phone number"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  placeholder="Enter your Email"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Enter your address"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  className="px-6 py-2 rounded border border-primary text-primary hover:bg-green-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded bg-primary text-white hover:bg-green-700 transition"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
