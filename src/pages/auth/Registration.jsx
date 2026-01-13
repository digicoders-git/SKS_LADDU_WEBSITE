import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, Phone, MapPin, Home, Eye, EyeOff } from 'lucide-react';

const Registration = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        city: '',
        landmark: '',
        houseNo: '',
        address: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});

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
        
        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
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
        
        if (!formData.phone) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
            newErrors.phone = 'Phone must start with 6,7,8,9 and be 10 digits';
        }
        
        if (!formData.city.trim()) {
            newErrors.city = 'City is required';
        }
        
        if (!formData.landmark.trim()) {
            newErrors.landmark = 'Landmark is required';
        }
        
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        
        if (Object.keys(newErrors).length === 0) {
            console.log('Registration data:', formData);
            alert('Registration successful!');
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--color-accent)] flex items-center justify-center py-12 px-4">
            <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-[var(--color-maroon)] mb-2">Create Account</h2>
                    <p className="text-gray-600">Join us for sweet experiences</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[var(--color-secondary)] outline-none transition-all ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="Enter your full name"
                                />
                            </div>
                            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[var(--color-secondary)] outline-none transition-all ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="Enter your email"
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full pl-12 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-[var(--color-secondary)] outline-none transition-all ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="Enter password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={`w-full pl-12 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-[var(--color-secondary)] outline-none transition-all ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="Confirm password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[var(--color-secondary)] outline-none transition-all ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Enter 10-digit phone number"
                                maxLength="10"
                            />
                        </div>
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[var(--color-secondary)] outline-none transition-all ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="Enter city"
                                />
                            </div>
                            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Landmark</label>
                            <input
                                type="text"
                                name="landmark"
                                value={formData.landmark}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[var(--color-secondary)] outline-none transition-all ${errors.landmark ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Enter landmark"
                            />
                            {errors.landmark && <p className="text-red-500 text-sm mt-1">{errors.landmark}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">House No. (Optional)</label>
                            <div className="relative">
                                <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    name="houseNo"
                                    value={formData.houseNo}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-secondary)] outline-none transition-all"
                                    placeholder="House/Flat No."
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Additional Address Details</label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            rows="3"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-secondary)] outline-none transition-all resize-none"
                            placeholder="Street, Area, Additional details..."
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[var(--color-maroon)] text-white py-3 rounded-xl font-bold hover:bg-[#a5231b] transition-all shadow-lg"
                    >
                        Create Account
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-[var(--color-maroon)] font-bold hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Registration;