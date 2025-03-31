import React, { useState } from "react";

const MyProfilePage = () => {
  const [userData, setUserData] = useState({
    name: "Kolawole Kehinde",
    image: "https://res.cloudinary.com/daarrcw3q/image/upload/v1743400008/khennycool_kolspu.jpg",
    email: "kolawolekehinde7033@gmail.com",
    phone: "+234 703 736 1571",
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Church Road, London",
    },
    gender: "Male",
    dob: "2000-01-19",
  });

  const [isEdit, setIsEdit] = useState(false);

  // Handle input changes
  const handleChange = (field, value) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle address change separately
  const handleAddressChange = (field, value) => {
    setUserData((prev) => ({
      ...prev,
      address: { ...prev.address, [field]: value },
    }));
  };

  return (
    <div className="wrapper max-w-lg flex flex-col gap-4 text-base font-outfit">
      <img src={userData.image} alt="Profile" className="w-36 rounded" />
      
      {/* Name Field */}
      {isEdit ? (
        <input
          type="text"
          value={userData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="text-2xl font-medium max-w-80 mt-4 border-b border-gray-300 focus:outline-none"
        />
      ) : (
        <p className="font-medium text-2xl text-neutral-800 mt-4 capitalize">{userData.name}</p>
      )}

      <hr className="bg-secondary-100 h-[1px] w-full border-none" />

      {/* Contact Information */}
      <div>
        <p className="text-base text-secondary-500 underline mt-3 uppercase">Contact Information</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-secondary-200">
          <p className="text-lg text-secondary-300">Email:</p>
          <p className="text-primary text-lg">{userData.email}</p>

          <p className="text-lg text-secondary-300">Phone:</p>
          {isEdit ? (
            <input
              type="text"
              value={userData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="bg-gray-100 w-36 px-2 py-1 border rounded"
            />
          ) : (
            <p className="text-lg text-primary">{userData.phone}</p>
          )}

          <p className="text-lg text-secondary-300">Address:</p>
          {isEdit ? (
            <div>
              <input
                type="text"
                value={userData.address.line1}
                onChange={(e) => handleAddressChange("line1", e.target.value)}
                className="bg-gray-100 w-full px-2 py-1 border rounded mb-2"
              />
              <input
                type="text"
                value={userData.address.line2}
                onChange={(e) => handleAddressChange("line2", e.target.value)}
                className="bg-gray-100 w-full px-2 py-1 border rounded"
              />
            </div>
          ) : (
            <p className="text-lg text-secondary-600">
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          )}
        </div>
      </div>

      {/* Basic Information */}
      <div>
        <p className="text-base text-secondary-500 underline mt-3 uppercase">Basic Information</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-secondary-200">
          <p className="text-lg text-secondary-300">Gender:</p>
          {isEdit ? (
            <select
              value={userData.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
              className="max-w-32 bg-gray-100 px-2 py-1 border rounded"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-lg text-secondary-600">{userData.gender}</p>
          )}

          <p className="text-lg text-secondary-300">Birthday:</p>
          {isEdit ? (
            <input
              type="date"
              value={userData.dob}
              max={new Date().toISOString().split("T")[0]} // Ensures only past or current dates can be selected
              onChange={(e) => handleChange("dob", e.target.value)}
              className="max-w-32 bg-gray-100 px-2 py-1 border rounded"
            />
          ) : (
            <p className="text-lg text-secondary-600">{userData.dob}</p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-10">
        {isEdit ? (
          <button
            onClick={() => setIsEdit(false)}
            className="border border-primary px-8 py-2 rounded hover:bg-primary hover:text-white transition-all"
          >
            Save Information
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="border border-primary px-8 py-2 rounded hover:bg-primary hover:text-white transition-all"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfilePage;
