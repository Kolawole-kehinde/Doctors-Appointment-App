import React, { useState } from "react";

const MyProfilePage = () => {
  const [userData, setUserData] = useState({
    name: "Kolawole Kehinde",
    image:
      "https://res.cloudinary.com/daarrcw3q/image/upload/v1743400008/khennycool_kolspu.jpg",
    email: "kolawolekehinde7033@gmail.com",
    phone: "+234 703 736 1571",
    address: {
      line1: "Circle, Church Road, London",
    },
    gender: "Male",
    dob: "2000-01-19",
  });

  const [isEdit, setIsEdit] = useState(false);

  // Handle profile picture change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserData((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  return (
    <div className="wrapper max-w-lg flex flex-col gap-2 text-base font-outfit px-4 lg:px-0">
      <div className="relative w-36">
        <img src={userData.image} alt="profile-picture" className="w-36 rounded border-2 border-gray-300" />
        {isEdit && (
          <div className="mt-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm text-gray-500"
            />
          </div>
        )}
      </div>

      {isEdit ? (
        <input
          type="text"
          value={userData.name}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
          className="text-[2rem] font-medium max-w-80 mt-4 border border-gray-300 p-1"
        />
      ) : (
        <p className="font-medium text-[2rem] text-neutral-800 mt-4 capitalize">
          {userData.name}
        </p>
      )}

      <hr className="bg-secondary-100 h-[1px] w-full border-none" />

      <div>
        <p className="text-base text-secondary-500 underline mt-3 uppercase">
          CONTACT INFORMATION
        </p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-secondary-200">
          <p className="text-lg text-secondary-300">Email:</p>
          <p className="text-primary text-base ml-2">{userData.email}</p>

          <p className="text-lg text-secondary-300">Phone:</p>
          {isEdit ? (
            <input
              type="text"
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="border border-gray-300 p-1 ml-3 md:ml-0"
            />
          ) : (
            <p className="text-lg text-primary">{userData.phone}</p>
          )}

          <p className="text-lg text-secondary-300">Address:</p>
          {isEdit ? (
            <>
              <input
                type="text"
                value={userData.address.line1}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))

                }
                className="border border-gray-300 p-1 ml-3  md:ml-0"
              />
              
            </>
          ) : (
            <p className="text-lg text-secondary-600">
              {userData.address.line1}
              <br />
            
            </p>
          )}
        </div>
      </div>

      <div>
        <p className="text-base text-secondary-500 underline mt-3 uppercase">
          BASIC INFORMATION
        </p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-secondary-200">
          <p className="text-lg text-secondary-300">Gender:</p>
          {isEdit ? (
            <select
              value={userData.gender}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
           className="border border-gray-300 p-1"
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
              max={new Date().toISOString().split("T")[0]} // Restrict to current date
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
            className="border border-gray-300 p-1"
            />
          ) : (
            <p className="text-lg text-secondary-600">{userData.dob}</p>
          )}
        </div>
      </div>

      <div className="mt-10">
        {isEdit ? (
          <button
            onClick={() => setIsEdit(false)}
            className="border border-primary px-8 py-2 rounded hover:bg-primary hover:text-white transition-all"
          >
            Save information
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
