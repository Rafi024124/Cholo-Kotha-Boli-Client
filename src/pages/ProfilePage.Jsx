import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Camera } from 'lucide-react';

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#134e4a] to-[#0f3d36] text-[#d1fae5] px-4">
      <h2 className="text-3xl font-semibold mb-6 text-[#c3e0e1]">Profile</h2>

      <div className="relative w-32 h-32 mb-4">
        <img
          src={selectedImg || authUser?.profilePic || '/avatar.jpg'}
          alt="Profile"
          className="w-full h-full object-cover rounded-full border-4 border-[#34d399]"
        />
        <label
          htmlFor="profilePic"
          className={`absolute bottom-1 right-1 bg-[#059669] hover:bg-[#047857] p-2 rounded-full cursor-pointer shadow-md transition ${
            isUpdatingProfile ? 'animate-pulse pointer-events-none' : ''
          }`}
        >
          <Camera className="w-4 h-4 text-[#c3e0e1]" />
        </label>
        <input
          id="profilePic"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      <p className="text-sm text-[#c3e0e1] mb-6">
        {isUpdatingProfile
          ? 'Uploading...'
          : 'Click the camera icon to update your photo'}
      </p>

      <div className="w-full max-w-sm space-y-4 mb-8">
        <div>
          <label className="block text-[#c3e0e1] text-sm mb-1">Full Name</label>
          <input
            type="text"
            readOnly
            value={authUser?.fullName || ''}
            className="w-full px-4 py-2 rounded-md bg-[#0f3d36] text-[#d1fae5] border border-[#059669] focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-[#c3e0e1] text-sm mb-1">Email</label>
          <input
            type="email"
            readOnly
            value={authUser?.email || ''}
            className="w-full px-4 py-2 rounded-md bg-[#0f3d36] text-[#d1fae5] border border-[#059669] focus:outline-none"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="w-full max-w-sm border-t border-[#059669] my-6"></div>

      {/* Account Info */}
      <div className="w-full max-w-sm space-y-2">
        <h3 className="text-lg font-medium text-[#a7f3d0] mb-2">Account Information</h3>
        <p className="text-sm text-[#c3e0e1]">
          <span className="font-semibold text-[#34d399]">Member Since:</span>{' '}
          {formatDate(authUser?.createdAt)}
        </p>
        <p className="text-sm text-[#c3e0e1]">
          <span className="font-semibold text-[#34d399]">Account Status:</span>{' '}
          <span className="text-green-400 font-semibold">Active</span>
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
