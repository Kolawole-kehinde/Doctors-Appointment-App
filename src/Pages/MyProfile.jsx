import React, { useState, useContext } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { AppContext } from '../context/AppContext';
import { useProfile } from '../hooks/useProfile';
import { passwordFields, profileFields } from '../constant/profileFields';
import CustomInput from '../Components/CustomInput';
import ActionButton from '../Components/CustomButton/ActionButoon';


const MyProfilePage = () => {
  const { user } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('profile');
  const {
    formData,
    passwordData,
    profilePicturePreview,
    handleChange,
    handlePasswordChange,
    handleProfilePictureChange,
    handleSubmitProfile,
    handleSubmitPassword,
  } = useProfile(user?.id);

  const renderForm = () => {
    const fields = activeTab === 'profile' ? profileFields : passwordFields;
    const handleSubmit = activeTab === 'profile' ? handleSubmitProfile : handleSubmitPassword;

    return (
      <form onSubmit={handleSubmit} className="space-y-5 bg-white border rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-2">{activeTab === 'profile' ? 'Profile Details' : 'Change Password'}</h2>
        {fields.map((field, idx) => (
          <CustomInput
            key={idx}
            label={field.label}
            name={field.name}
            value={activeTab === 'profile' ? formData[field.name] : passwordData[field.name]}
            onChange={activeTab === 'profile' ? handleChange : handlePasswordChange}
            placeholder={field.placeholder}
            type={field.type || (activeTab === 'profile' ? 'text' : 'password')}
          />
        ))}
        <div className="flex justify-end gap-4 pt-4">
          <ActionButton type="button" text="Cancel" className="text-primary hover:bg-green-50 border border-primary" />
          <ActionButton type="submit" text="Update" className="bg-primary text-white hover:bg-blue-700" />
        </div>
      </form>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-20 font-outfit">
      <div className="bg-white max-w-5xl mx-auto rounded-lg shadow-md overflow-hidden">
        <div className="bg-gray-200 h-24 relative flex flex-col justify-center items-center">
          <label className="relative z-10 cursor-pointer">
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleProfilePictureChange}
            />
            <div className="relative w-32 h-32 -mb-16">
              <img 
                src={profilePicturePreview || user?.profilePicture || 'https://via.placeholder.com/150'} 
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
              {['profile', 'password'].map((tab) => (
                <li
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-2 px-4 py-3 cursor-pointer ${activeTab === tab ? 'text-blue-600 bg-white font-semibold rounded-b-xl border-b-2 border-primary' : 'text-black bg-white hover:bg-gray-100 border-b border-gray-200'}`}
                >
                  {tab === 'profile' ? <FaUser /> : <FaLock />}
                  {tab === 'profile' ? 'Profile Details' : 'Change Password'}
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
