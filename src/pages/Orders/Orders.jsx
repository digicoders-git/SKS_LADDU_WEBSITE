import React, { useState, useEffect } from 'react';
import { getUserOrdersApi, cancelOrderApi } from '../../api/order';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { XCircle, Package, Calendar, MapPin, CreditCard, ShoppingBag, CheckCircle2, Eye, X, Clock, Info } from 'lucide-react';
import Swal from 'sweetalert2';
import Footer from '../../components/layout/Footer';
import Loader from '../../components/common/Loader';

const OrderDetailsModal = ({ order, isOpen, onClose, onCancel, getStatusColor, formatDate }) => {
    if (!isOpen || !order) return null;

    const handleCancelClick = () => {
        const status = order.status?.toLowerCase();
        const method = order.paymentMethod?.toLowerCase();

        if (status === 'pending' && method === 'cod') {
            onCancel(order._id);
        } else {
            Swal.fire({
                title: 'Cancellation Policy',
                text: 'This order cannot be cancelled as per our policy. Once an order is paid or processed, cancellation is not available.',
                icon: 'info',
                confirmButtonColor: 'var(--color-secondary)',
                background: '#fff',
                color: '#000',
                customClass: {
                    popup: 'rounded-[2rem]'
                }
            });
        }
    };

    return (
        <div className="fixed inset-0 z-[50] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300 mt-24">
            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[75vh] animate-in zoom-in-95">
                {/* Header */}
                {/* <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div className="flex items-center gap-3">
                        <Package className="text-[var(--color-secondary)]" size={20} />
                        <h2 className="text-lg font-bold text-gray-900">Order Information</h2>
                    </div>
                    <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="text-gray-400" size={22} />
                    </button>
                </div> */}

                {/* Content */}
                <div className="p-6 overflow-y-auto custom-scrollbar flex-grow space-y-8 bg-white">
                    {/* Basic Info Row */}
                    <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100">
                        <div className="space-y-1">
                            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Order Reference</p>
                            <p className="text-sm font-mono font-bold text-gray-900 leading-none">#{order._id.slice(-6).toUpperCase()}</p>
                        </div>
                        <div className="space-y-1 text-right">
                            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Dated</p>
                            <p className="text-sm text-gray-900 font-bold">{formatDate(order.createdAt)}</p>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div>
                        <h3 className="text-xs font-bold text-gray-900 mb-4 px-1 uppercase tracking-widest flex items-center gap-2">
                            <ShoppingBag size={14} className="text-[var(--color-secondary)]" /> Items Summary ({order.items.length})
                        </h3>
                        <div className="space-y-3">
                            {order.items.map((item, index) => (
                                <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 shrink-0 border border-gray-100">
                                        <img
                                            src={item.product?.mainImage?.url}
                                            alt={item.productName}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-grow min-w-0">
                                        <h4 className="font-bold text-gray-900 text-sm truncate">{item.productName}</h4>
                                        <p className="text-xs text-gray-500 font-medium tracking-tight">Quantity: {item.quantity} × ₹{item.productPrice}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-gray-900 text-sm leading-none">₹{item.productPrice * item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Shipping and Payment Split */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 space-y-3">
                            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <MapPin size={12} className="text-[var(--color-secondary)]" /> Shipping Address
                            </h4>
                            <div className="text-xs text-gray-600 space-y-1 leading-relaxed font-medium">
                                <p className="text-gray-900 font-bold">{order.shippingAddress?.name}</p>
                                <p>{order.shippingAddress?.addressLine1}</p>
                                {order.shippingAddress?.addressLine2 && <p>{order.shippingAddress?.addressLine2}</p>}
                                <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}</p>
                            </div>
                        </div>

                        <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <CreditCard size={12} className="text-[var(--color-secondary)]" /> Payment & Status
                            </h4>
                            <div className="space-y-3 text-xs">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500 font-medium">Payment Method</span>
                                    <span className="text-gray-900 font-bold uppercase">{order.paymentMethod}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500 font-medium">Current Status</span>
                                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${getStatusColor(order.status)} uppercase tracking-tighter shadow-sm`}>
                                        {order.status}
                                    </span>
                                </div>
                                <div className="pt-3 mt-1 border-t border-gray-200/60 flex justify-between items-center">
                                    <span className="text-gray-900 font-bold">Grand Total</span>
                                    <span className="text-xl font-black text-zinc-900 drop-shadow-sm">₹{order.total}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-5 bg-gray-50/80 border-t border-gray-100 flex gap-3 justify-end items-center font-[var(--font-body)]">
                    <button
                        onClick={handleCancelClick}
                        className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors mr-auto"
                    >
                        <span className="hidden sm:inline">Cancel Request</span>
                        <span className="sm:hidden">Cancel</span>
                    </button>
                    <button
                        onClick={onClose}
                        className="px-8 py-2.5 bg-gray-900 text-white text-xs font-bold rounded-xl hover:bg-gray-800 transition-all shadow-md active:scale-95"
                    >
                        <span className="hidden sm:inline">Close Details</span>
                        <span className="sm:hidden">Close</span>
                    </button>
                </div>
            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #ccc; border-radius: 10px; }
            `}} />
        </div>
    );
};

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const data = await getUserOrdersApi();
            if (data && data.orders) {
                const sortedOrders = data.orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setOrders(sortedOrders);
            }
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleCancelOrder = async (orderId) => {
        const result = await Swal.fire({
            title: 'Cancel Order?',
            text: "Do you want to cancel this order from your history?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#111',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Yes, Cancel it',
            background: '#fff',
            color: '#000',
            borderRadius: '1.5rem'
        });

        if (!result.isConfirmed) return;

        try {
            const res = await cancelOrderApi(orderId);
            if (res.success || res.message === "Order cancelled successfully") {
                toast.success("Order cancelled successfully");
                setIsModalOpen(false);
                fetchOrders();
            } else {
                toast.error(res.message || "Failed to cancel order");
            }
        } catch (error) {
            console.error("Cancel order error:", error);
            toast.error("Something went wrong");
        }
    };

    const openOrderDetails = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'confirmed': return 'text-green-600 bg-green-50 border-green-100';
            case 'processing': return 'text-blue-600 bg-blue-50 border-blue-100';
            case 'shipped': return 'text-orange-600 bg-orange-50 border-orange-100';
            case 'delivered': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
            case 'cancelled': return 'text-red-600 bg-red-50 border-red-100';
            default: return 'text-gray-600 bg-gray-50 border-gray-100';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[var(--color-primary)] flex items-center justify-center">
                <Loader text="Fetching your orders..." />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-[var(--color-primary)]">
            <div className="flex-grow pt-8 pb-16 px-4 md:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Simplified Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6 border-b border-white/10 pb-10">
                        <div>
                            <h1 className="text-4xl font-black text-white mb-2 leading-none uppercase tracking-tight">Orders History</h1>
                            <p className="text-sm font-medium text-gray-500">Track and manage your delicious purchases</p>
                        </div>
                        <div className="bg-white px-8 py-4 rounded-3xl border border-white/5 shadow-inner">
                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-1">Total Placed</p>
                            <p className="text-2xl font-black text-black leading-none">{orders.length} <span className="text-xs font-bold text-gray-400">Records</span></p>
                        </div>
                    </div>

                    {orders.length === 0 ? (
                        <div className="bg-white/[0.02] rounded-3xl p-20 text-center border border-white/5">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10">
                                <ShoppingBag size={32} className="text-gray-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-4">No records found</h2>
                            <p className="text-gray-500 text-sm mb-10 max-w-xs mx-auto">Indulge in our authentic Sandila laddus today and start your journey!</p>
                            <button
                                onClick={() => navigate('/laddus')}
                                className="px-10 py-4 bg-[var(--color-secondary)] text-white font-black rounded-2xl hover:scale-105 transition-all shadow-lg shadow-yellow-500/10"
                            >
                                Shop Laddus
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {/* Simple Table Header */}
                            <div className="hidden md:grid grid-cols-6 gap-4 px-10 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">
                                <div className="col-span-2">Order Identification</div>
                                <div>Placement Date</div>
                                <div>Order Total</div>
                                <div>Status</div>
                                <div className="text-right">Manage</div>
                            </div>

                            {orders.map((order) => (
                                <div key={order._id} className="bg-white/[0.03] rounded-[2rem] p-5 md:px-10 md:py-6 border border-white/5 hover:border-[var(--color-secondary)]/30 transition-all group shadow-sm">
                                    <div className="flex flex-col md:grid md:grid-cols-6 items-start md:items-center gap-4">
                                        <div className="w-full md:col-span-2 flex items-center gap-5">
                                            <div className="bg-white/5 w-12 h-12 rounded-2xl flex items-center justify-center border border-white/5 shrink-0 transition-transform group-hover:scale-105">
                                                <Package size={22} className="text-[var(--color-secondary)]" />
                                            </div>
                                            <div className="flex-grow min-w-0">
                                                <p className="text-base font-bold text-zinc-700 leading-tight">Order #{order._id.slice(-6).toUpperCase()}</p>
                                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">
                                                    {order.items.length} {order.items.length > 1 ? 'items' : 'item'}
                                                    <span className="md:hidden opacity-50"> • {formatDate(order.createdAt)}</span>
                                                </p>
                                            </div>
                                            <div className="md:hidden shrink-0">
                                                <p className="text-lg font-black text-zinc-700">₹{order.total}</p>
                                            </div>
                                        </div>

                                        <div className="hidden md:block">
                                            <p className="text-sm font-bold text-gray-400">{formatDate(order.createdAt)}</p>
                                        </div>

                                        <div className="hidden md:block">
                                            <p className="text-lg font-black text-zinc-700">₹{order.total}</p>
                                        </div>

                                        <div className="w-full md:w-auto shrink-0">
                                            <span className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border ${getStatusColor(order.status)} uppercase tracking-wider block w-fit shadow-inner`}>
                                                {order.status}
                                            </span>
                                        </div>

                                        <div className="w-full md:block md:text-right">
                                            <button
                                                onClick={() => openOrderDetails(order)}
                                                className="flex items-center justify-center gap-2 w-full md:w-auto md:ml-auto px-6 py-3 bg-white text-black rounded-[1.2rem] font-black text-xs hover:bg-[var(--color-secondary)] transition-all shadow-md active:scale-95"
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <OrderDetailsModal
                order={selectedOrder}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCancel={handleCancelOrder}
                getStatusColor={getStatusColor}
                formatDate={formatDate}
            />

            <Footer />
        </div>
    );
};

export default Orders;
