import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Home, Lock, Eye, EyeOff, LogOut, Edit2, Save, X } from 'lucide-react';
import { toast } from 'react-toastify';
import Footer from '../../components/layout/Footer';

const Profile = () => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [profileData, setProfileData] = useState({
        fullName: 'Satish Kumar',
        email: 'satish@example.com',
        phone: '9876543210',
        city: 'Sandila',
        landmark: 'Near Railway Station',
        houseNo: '123',
        address: 'Main Road, Ahirawan'
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleProfileChange = (e) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value
        });
    };

    const handlePasswordChange = (e) => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value
        });
    };

    const handleSaveProfile = () => {
        toast.success('Profile updated successfully!');
        setIsEditing(false);
    };

    const handleChangePassword = (e) => {
        e.preventDefault();
        if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
            toast.error('Please fill all password fields');
            return;
        }
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error('New passwords do not match');
            return;
        }
        toast.success('Password changed successfully!');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    };

    const handleLogout = () => {
        toast.success('Logged out successfully!');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-[var(--color-primary)] text-[var(--color-text)]">
            <div className="py-12 px-4 md:px-8 max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-secondary)] mb-2">My Profile</h1>
                    <p className="text-gray-400">Manage your account information</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Profile Info Section */}
                    <div className="lg:col-span-2 bg-[var(--color-muted)] rounded-2xl p-6 md:p-8 border border-[var(--color-secondary)]/20">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl md:text-2xl font-bold text-[var(--color-secondary)]">Profile Information</h2>
                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-[var(--color-secondary)] text-[var(--color-primary)] rounded-lg font-semibold hover:opacity-90 transition-all text-sm"
                                >
                                    <Edit2 size={16} />
                                    Edit
                                </button>
                            ) : (
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <button
                                        onClick={handleSaveProfile}
                                        className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all text-sm min-w-0"
                                    >
                                        <Save size={16} />
                                        <span className="whitespace-nowrap">Save</span>
                                    </button>
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all text-sm min-w-0"
                                    >
                                        <X size={16} />
                                        <span className="whitespace-nowrap">Cancel</span>
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-300 mb-2">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={profileData.fullName}
                                            onChange={handleProfileChange}
                                            disabled={!isEditing}
                                            className="w-full pl-10 pr-4 py-2.5 bg-[var(--color-primary)] border border-[var(--color-secondary)]/20 text-white rounded-lg outline-none transition-all text-sm disabled:opacity-60"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-300 mb-2">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                        <input
                                            type="email"
                                            name="email"
                                            value={profileData.email}
                                            disabled
                                            className="w-full pl-10 pr-4 py-2.5 bg-[var(--color-primary)] border border-[var(--color-secondary)]/20 text-white rounded-lg outline-none transition-all text-sm opacity-60 cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-300 mb-2">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={profileData.phone}
                                        onChange={handleProfileChange}
                                        disabled={!isEditing}
                                        className="w-full pl-10 pr-4 py-2.5 bg-[var(--color-primary)] border border-[var(--color-secondary)]/20 text-white rounded-lg outline-none transition-all text-sm disabled:opacity-60"
                                        maxLength="10"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-300 mb-2">City</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                        <input
                                            type="text"
                                            name="city"
                                            value={profileData.city}
                                            onChange={handleProfileChange}
                                            disabled={!isEditing}
                                            className="w-full pl-10 pr-4 py-2.5 bg-[var(--color-primary)] border border-[var(--color-secondary)]/20 text-white rounded-lg outline-none transition-all text-sm disabled:opacity-60"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-300 mb-2">Landmark</label>
                                    <input
                                        type="text"
                                        name="landmark"
                                        value={profileData.landmark}
                                        onChange={handleProfileChange}
                                        disabled={!isEditing}
                                        className="w-full px-4 py-2.5 bg-[var(--color-primary)] border border-[var(--color-secondary)]/20 text-white rounded-lg outline-none transition-all text-sm disabled:opacity-60"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-300 mb-2">House No.</label>
                                    <div className="relative">
                                        <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                        <input
                                            type="text"
                                            name="houseNo"
                                            value={profileData.houseNo}
                                            onChange={handleProfileChange}
                                            disabled={!isEditing}
                                            className="w-full pl-10 pr-4 py-2.5 bg-[var(--color-primary)] border border-[var(--color-secondary)]/20 text-white rounded-lg outline-none transition-all text-sm disabled:opacity-60"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-300 mb-2">Additional Address</label>
                                <textarea
                                    name="address"
                                    value={profileData.address}
                                    onChange={handleProfileChange}
                                    disabled={!isEditing}
                                    rows="3"
                                    className="w-full px-4 py-2.5 bg-[var(--color-primary)] border border-[var(--color-secondary)]/20 text-white rounded-lg outline-none transition-all resize-none text-sm disabled:opacity-60"
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Change Password & Logout Section */}
                    <div className="space-y-6">
                        {/* Change Password */}
                        <div className="bg-[var(--color-muted)] rounded-2xl p-6 border border-[var(--color-secondary)]/20">
                            <h2 className="text-xl font-bold text-[var(--color-secondary)] mb-4">Change Password</h2>
                            <form onSubmit={handleChangePassword} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-300 mb-2">Current Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                        <input
                                            type={showCurrentPassword ? 'text' : 'password'}
                                            name="currentPassword"
                                            value={passwordData.currentPassword}
                                            onChange={handlePasswordChange}
                                            className="w-full pl-10 pr-10 py-2.5 bg-[var(--color-primary)] border border-[var(--color-secondary)]/20 text-white rounded-lg outline-none transition-all text-sm"
                                            placeholder="Enter current password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                                        >
                                            {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-300 mb-2">New Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                        <input
                                            type={showNewPassword ? 'text' : 'password'}
                                            name="newPassword"
                                            value={passwordData.newPassword}
                                            onChange={handlePasswordChange}
                                            className="w-full pl-10 pr-10 py-2.5 bg-[var(--color-primary)] border border-[var(--color-secondary)]/20 text-white rounded-lg outline-none transition-all text-sm"
                                            placeholder="Enter new password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                                        >
                                            {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-300 mb-2">Confirm Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            name="confirmPassword"
                                            value={passwordData.confirmPassword}
                                            onChange={handlePasswordChange}
                                            className="w-full pl-10 pr-10 py-2.5 bg-[var(--color-primary)] border border-[var(--color-secondary)]/20 text-white rounded-lg outline-none transition-all text-sm"
                                            placeholder="Confirm new password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                                        >
                                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-[var(--color-secondary)] text-[var(--color-primary)] py-2.5 rounded-lg font-bold hover:opacity-90 transition-all text-sm"
                                >
                                    Update Password
                                </button>
                            </form>
                        </div>

                        {/* Logout Button */}
                        <div className="bg-[var(--color-muted)] rounded-2xl p-6 border border-[var(--color-secondary)]/20">
                            <h2 className="text-xl font-bold text-[var(--color-secondary)] mb-4">Account Actions</h2>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2.5 rounded-lg font-bold hover:bg-red-700 transition-all text-sm"
                            >
                                <LogOut size={18} />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Profile;
