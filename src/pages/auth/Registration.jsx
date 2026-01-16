import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, Calendar, Eye, EyeOff, ChevronDown } from 'lucide-react';
import { createUserApi } from '../../api/user';
import { toast } from 'react-toastify';

const Registration = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        dob: '',
        gender: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showGenderDropdown, setShowGenderDropdown] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: ''
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }

        if (!formData.phone) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
            newErrors.phone = 'Phone must start with 6,7,8,9 and be 10 digits';
        }

        if (!formData.dob) {
            newErrors.dob = 'Date of birth is required';
        }

        if (!formData.gender) {
            newErrors.gender = 'Gender is required';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Confirm password is required';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length === 0) {
            try {
                const payload = {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phone: formData.phone,
                    password: formData.password,
                    dateOfBirth: formData.dob,
                    gender: formData.gender.toLowerCase()
                };

                const response = await createUserApi(payload);

                if (response.token) {
                    localStorage.setItem('userToken', response.token);
                    toast.success('Registration successful!');
                    navigate('/');
                }
            } catch (error) {
                console.error('Registration failed:', error);
                const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
                toast.error(errorMessage);
            }
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--color-primary)] flex items-center justify-center py-12 px-4">
            <div className="max-w-2xl w-full bg-[var(--color-muted)] rounded-3xl shadow-2xl p-8 border border-[var(--color-secondary)]/20">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-[var(--color-secondary)] mb-2">Create Account</h2>
                    <p className="text-gray-400">Join us for sweet experiences</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-300 mb-2">First Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className={`w-full pl-12 pr-4 py-3 bg-[var(--color-primary)] border text-white rounded-xl focus:ring-2 focus:ring-[var(--color-secondary)] outline-none transition-all ${errors.firstName ? 'border-red-500' : 'border-[var(--color-secondary)]/20'}`}
                                    placeholder="Enter first name"
                                />
                            </div>
                            {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-300 mb-2">Last Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className={`w-full pl-12 pr-4 py-3 bg-[var(--color-primary)] border text-white rounded-xl focus:ring-2 focus:ring-[var(--color-secondary)] outline-none transition-all ${errors.lastName ? 'border-red-500' : 'border-[var(--color-secondary)]/20'}`}
                                    placeholder="Enter last name"
                                />
                            </div>
                            {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-300 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full pl-12 pr-12 py-3 bg-[var(--color-primary)] border text-white rounded-xl focus:ring-2 focus:ring-[var(--color-secondary)] outline-none transition-all ${errors.password ? 'border-red-500' : 'border-[var(--color-secondary)]/20'}`}
                                    placeholder="Enter password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-300 mb-2">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={`w-full pl-12 pr-12 py-3 bg-[var(--color-primary)] border text-white rounded-xl focus:ring-2 focus:ring-[var(--color-secondary)] outline-none transition-all ${errors.confirmPassword ? 'border-red-500' : 'border-[var(--color-secondary)]/20'}`}
                                    placeholder="Confirm password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-300 mb-2">Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`w-full pl-12 pr-4 py-3 bg-[var(--color-primary)] border text-white rounded-xl focus:ring-2 focus:ring-[var(--color-secondary)] outline-none transition-all ${errors.phone ? 'border-red-500' : 'border-[var(--color-secondary)]/20'}`}
                                    placeholder="Enter 10-digit phone number"
                                    maxLength="10"
                                />
                            </div>
                            {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-300 mb-2">Date of Birth</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                                <input
                                    type="date"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    className={`w-full pl-12 pr-4 py-3 bg-[var(--color-primary)] border text-white rounded-xl focus:ring-2 focus:ring-[var(--color-secondary)] outline-none transition-all ${errors.dob ? 'border-red-500' : 'border-[var(--color-secondary)]/20'}`}
                                />
                            </div>
                            {errors.dob && <p className="text-red-400 text-sm mt-1">{errors.dob}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2">Gender</label>
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setShowGenderDropdown(!showGenderDropdown)}
                                className={`w-full px-4 py-3 bg-[var(--color-primary)] border text-white rounded-xl focus:ring-2 focus:ring-[var(--color-secondary)] outline-none transition-all text-left flex items-center justify-between ${errors.gender ? 'border-red-500' : 'border-[var(--color-secondary)]/20'
                                    }`}
                            >
                                <span className={formData.gender ? 'text-white' : 'text-gray-500'}>
                                    {formData.gender || 'Select gender'}
                                </span>
                                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showGenderDropdown ? 'rotate-180' : ''}`} />
                            </button>
                            {showGenderDropdown && (
                                <div className="absolute z-10 w-full mt-2 bg-[var(--color-muted)] border border-[var(--color-secondary)]/20 rounded-xl shadow-lg overflow-hidden">
                                    {['Male', 'Female', 'Other'].map((option) => (
                                        <button
                                            key={option}
                                            type="button"
                                            onClick={() => {
                                                setFormData({ ...formData, gender: option });
                                                setShowGenderDropdown(false);
                                                if (errors.gender) {
                                                    setErrors({ ...errors, gender: '' });
                                                }
                                            }}
                                            className="w-full px-4 py-3 text-left text-white hover:bg-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-all"
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        {errors.gender && <p className="text-red-400 text-sm mt-1">{errors.gender}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full pl-12 pr-4 py-3 bg-[var(--color-primary)] border text-white rounded-xl focus:ring-2 focus:ring-[var(--color-secondary)] outline-none transition-all ${errors.email ? 'border-red-500' : 'border-[var(--color-secondary)]/20'}`}
                                placeholder="Enter your email"
                            />
                        </div>
                        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[var(--color-secondary)] text-[var(--color-primary)] py-3 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg"
                    >
                        Create Account
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-400">
                        Already have an account?{' '}
                        <Link to="/login" className="text-[var(--color-secondary)] font-bold hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Registration;