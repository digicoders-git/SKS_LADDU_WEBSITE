import { getProfileApi, updateProfileApi } from '../../api/user';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Home, Lock, Eye, EyeOff, LogOut, Edit2, Save, X, Calendar } from 'lucide-react';
import { toast } from 'react-toastify';
import Footer from '../../components/layout/Footer';
import Swal from 'sweetalert2';

const Profile = () => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordLoading, setIsPasswordLoading] = useState(false);

    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfileApi();
                const user = data.user;
                if (user) {
                    setProfileData({
                        firstName: user.firstName || '',
                        lastName: user.lastName || '',
                        email: user.email || '',
                        phone: user.phone || '',
                        dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : '',
                        gender: user.gender || ''
                    });
                }
            } catch (error) {
                console.error("Failed to fetch profile:", error);
                if (error.response && error.response.status === 401) {
                    toast.error("Session expired. Please login again.");
                    navigate('/login');
                }
            }
        };

        fetchProfile();
    }, [navigate]);

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

    const handleSaveProfile = async () => {
        setIsLoading(true);
        try {
            const profilePayload = {
                firstName: profileData.firstName,
                lastName: profileData.lastName,
                phone: profileData.phone,
                dateOfBirth: profileData.dateOfBirth,
                gender: profileData.gender
            };
            await updateProfileApi(profilePayload);

            toast.success('Profile updated successfully!');
            setIsEditing(false);
        } catch (error) {
            console.error("Update failed:", error);
            const message = error.response?.data?.message || 'Failed to update profile. Please try again.';
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
            toast.error('Please fill all password fields');
            return;
        }
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error('New passwords do not match');
            return;
        }

        setIsPasswordLoading(true);
        try {
            const passwordPayload = {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword,
                confirmPassword: passwordData.confirmPassword
            };
            await updateProfileApi(passwordPayload);

            toast.success('Password changed successfully!');
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            console.error("Password update failed:", error);
            const message = error.response?.data?.message || 'Failed to update password. Please try again.';
            toast.error(message);
        } finally {
            setIsPasswordLoading(false);
        }
    };

    const handleLogout = async () => {
        const result = await Swal.fire({
            title: 'Logout Confirmation',
            text: 'Are you sure you want to logout?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-secondary)',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Logout',
            background: '#1f2937',
            color: '#fff'
        });

        if (result.isConfirmed) {
            localStorage.removeItem('userToken'); // Clear token
            toast.success('Logged out successfully!');
            navigate('/login');
        }
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
                                        disabled={isLoading}
                                        className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all text-sm min-w-[80px] disabled:opacity-50"
                                    >
                                        {isLoading ? (
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            <Save size={16} />
                                        )}
                                        <span className="whitespace-nowrap">{isLoading ? 'Saving...' : 'Save'}</span>
                                    </button>
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        disabled={isLoading}
                                        className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all text-sm min-w-[80px] disabled:opacity-50"
                                    >
                                        <X size={16} />
                                        <span className="whitespace-nowrap">Cancel</span>
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="space-y-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div>
                                    <label className="block text-base font-bold text-gray-700 mb-3">First Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={profileData.firstName}
                                            onChange={handleProfileChange}
                                            disabled={!isEditing}
                                            className="w-full pl-10 pr-4 py-3.5 bg-white border border-[var(--color-secondary)]/20 text-[var(--color-text)] rounded-lg outline-none transition-all text-base disabled:opacity-60"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-base font-bold text-gray-700 mb-3">Last Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={profileData.lastName}
                                            onChange={handleProfileChange}
                                            disabled={!isEditing}
                                            className="w-full pl-10 pr-4 py-3.5 bg-white border border-[var(--color-secondary)]/20 text-[var(--color-text)] rounded-lg outline-none transition-all text-base disabled:opacity-60"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div>
                                    <label className="block text-base font-bold text-gray-700 mb-3">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                        <input
                                            type="email"
                                            name="email"
                                            value={profileData.email}
                                            onChange={handleProfileChange}
                                            disabled={!isEditing}
                                            className="w-full pl-10 pr-4 py-3.5 bg-white border border-[var(--color-secondary)]/20 text-[var(--color-text)] rounded-lg outline-none transition-all text-base disabled:opacity-60"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-base font-bold text-gray-700 mb-3">Gender</label>
                                    <div className="relative">
                                        <select
                                            name="gender"
                                            value={profileData.gender}
                                            onChange={handleProfileChange}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-3.5 bg-white border border-[var(--color-secondary)]/20 text-[var(--color-text)] rounded-lg outline-none transition-all text-base disabled:opacity-60"
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div>
                                    <label className="block text-base font-bold text-gray-700 mb-3">Phone Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={profileData.phone}
                                            onChange={handleProfileChange}
                                            disabled={!isEditing}
                                            className="w-full pl-10 pr-4 py-3.5 bg-white border border-[var(--color-secondary)]/20 text-[var(--color-text)] rounded-lg outline-none transition-all text-base disabled:opacity-60"
                                            maxLength="10"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-base font-bold text-gray-700 mb-3">Date of Birth</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                        <input
                                            type="date"
                                            name="dateOfBirth"
                                            value={profileData.dateOfBirth}
                                            onChange={handleProfileChange}
                                            disabled={!isEditing}
                                            className="w-full pl-10 pr-4 py-3.5 bg-white border border-[var(--color-secondary)]/20 text-[var(--color-text)] rounded-lg outline-none transition-all text-base disabled:opacity-60"
                                        />
                                    </div>
                                </div>
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
                                    <label className="block text-sm font-bold text-zinc-600 mb-2">Current Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                        <input
                                            type={showCurrentPassword ? 'text' : 'password'}
                                            name="currentPassword"
                                            value={passwordData.currentPassword}
                                            onChange={handlePasswordChange}
                                            className="w-full pl-10 pr-10 py-2.5 bg-white border border-[var(--color-secondary)]/20 text-[var(--color-text)] rounded-lg outline-none transition-all text-sm"
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
                                    <label className="block text-sm font-bold text-zinc-600 mb-2">New Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                        <input
                                            type={showNewPassword ? 'text' : 'password'}
                                            name="newPassword"
                                            value={passwordData.newPassword}
                                            onChange={handlePasswordChange}
                                            className="w-full pl-10 pr-10 py-2.5 bg-white border border-[var(--color-secondary)]/20 text-[var(--color-text)] rounded-lg outline-none transition-all text-sm"
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
                                    <label className="block text-sm font-bold text-zinc-600 mb-2">Confirm Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            name="confirmPassword"
                                            value={passwordData.confirmPassword}
                                            onChange={handlePasswordChange}
                                            className="w-full pl-10 pr-10 py-2.5 bg-white border border-[var(--color-secondary)]/20 text-[var(--color-text)] rounded-lg outline-none transition-all text-sm"
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
                                    disabled={isPasswordLoading}
                                    className="w-full bg-[var(--color-secondary)] text-[var(--color-primary)] py-2.5 rounded-lg font-bold hover:opacity-90 transition-all text-sm disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {isPasswordLoading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
                                            <span>Updating...</span>
                                        </>
                                    ) : (
                                        'Update Password'
                                    )}
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
