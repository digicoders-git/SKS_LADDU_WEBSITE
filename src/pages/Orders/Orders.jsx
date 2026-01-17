import React, { useState, useEffect } from 'react';
import { getUserOrdersApi, cancelOrderApi } from '../../api/order';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { XCircle, Package, Calendar, MapPin, CreditCard, ShoppingBag, CheckCircle2, ChevronRight, Clock } from 'lucide-react';
import Swal from 'sweetalert2';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const data = await getUserOrdersApi();
            if (data && data.orders) {
                setOrders(data.orders);
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
            title: 'Are you sure?',
            text: "Do you really want to cancel this order?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, cancel it!',
            background: 'var(--color-muted)',
            color: '#fff'
        });

        if (!result.isConfirmed) return;

        try {
            const res = await cancelOrderApi(orderId);
            if (res.success || res.message === "Order cancelled successfully") {
                toast.success(res.message || "Order cancelled successfully.");
                fetchOrders(); // Refresh the list
            } else {
                toast.error(res.message || "Failed to cancel order.");
            }
        } catch (error) {
            console.error("Cancel order error:", error);
            const errorMsg = error.response?.data?.message || "Something went wrong while cancelling the order.";
            toast.error(errorMsg);
        }
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'confirmed': return 'text-green-400 bg-green-400/10 border-green-400/20';
            case 'processing': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
            case 'shipped': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
            case 'delivered': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
            case 'cancelled': return 'text-red-400 bg-red-400/10 border-red-400/20';
            default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[var(--color-primary)] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-secondary)]"></div>
            </div>
        );
    }

    return (
        <div className="bg-[var(--color-primary)] text-[var(--color-text)] font-[var(--font-body)] min-h-screen pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-secondary)] font-[var(--font-heading)]">My Orders</h1>
                        <p className="text-gray-400 mt-2">Track and manage your recent laddu purchases.</p>
                    </div>
                    <div className="bg-[var(--color-muted)] px-4 py-2 rounded-xl border border-[var(--color-secondary)]/10 flex items-center gap-2">
                        <Package size={18} className="text-[var(--color-secondary)]" />
                        <span className="text-sm font-bold text-zinc-500">Total Orders: <span className="text-zinc-700">{orders.length}</span></span>
                    </div>
                </div>

                {orders.length === 0 ? (
                    <div className="bg-[var(--color-muted)] rounded-3xl p-12 text-center border border-[var(--color-secondary)]/10">
                        <ShoppingBag size={64} className="mx-auto text-gray-600 mb-6" />
                        <h2 className="text-2xl font-bold text-white mb-2">No orders yet</h2>
                        <p className="text-gray-400 mb-8">It looks like you haven't indulged in our laddus yet.</p>
                        <button
                            onClick={() => navigate('/laddus')}
                            className="px-8 py-3 bg-[var(--color-secondary)] text-[var(--color-primary)] rounded-xl font-bold hover:bg-[#ffe033] transition-all"
                        >
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order._id} className="bg-[var(--color-muted)] rounded-3xl p-6 md:p-8 border border-[var(--color-secondary)]/10 hover:border-[var(--color-secondary)]/30 transition-all shadow-lg group">
                                {/* Order Header */}
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-white/5">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-3">
                                            <span className="text-base md:text-lg font-bold text-white whitespace-nowrap">Order #{order._id.slice(-6).toUpperCase()}</span>
                                            <span className={`px-3 py-1 rounded-full text-[10px] md:text-xs font-bold border ${getStatusColor(order.status)} uppercase tracking-wider flex items-center gap-1`}>
                                                {order.status === 'confirmed' && <CheckCircle2 size={10} className="md:w-3 md:h-3" />}
                                                {order.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-400">
                                            <Calendar size={12} className="md:w-3.5 md:h-3.5" />
                                            <span>{formatDate(order.createdAt)}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4">
                                        <div className="text-left md:text-right">
                                            <p className="text-[10px] md:text-sm text-gray-400 md:mb-1">Total Amount</p>
                                            <p className="text-xl md:text-2xl font-bold text-[var(--color-secondary)]">₹{order.total}</p>
                                        </div>
                                        {['confirmed', 'processing', 'pending', 'placed'].includes(order.status.toLowerCase()) && (
                                            <button
                                                onClick={() => handleCancelOrder(order._id)}
                                                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 rounded-lg text-xs font-bold transition-all whitespace-nowrap"
                                            >
                                                <XCircle size={14} />
                                                <span className="md:inline hidden">Cancel Order</span>
                                                <span className="md:hidden inline">Cancel</span>
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="space-y-4 mb-6">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="flex items-center gap-4 bg-[var(--color-primary)]/50 p-3 rounded-xl border border-white/5">
                                            <img
                                                src={item.product?.mainImage?.url}
                                                alt={item.productName}
                                                className="w-16 h-16 rounded-lg object-cover border border-[var(--color-secondary)]/20"
                                            />
                                            <div className="flex-grow">
                                                <h3 className="font-bold text-white text-base">{item.productName}</h3>
                                                <p className="text-sm text-gray-400">Qty: {item.quantity} × ₹{item.productPrice}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-black">₹{item.productPrice * item.quantity}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Order Footer: Address & Payment */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-[var(--color-primary)]/30 rounded-2xl">
                                    <div className="flex items-start gap-3">
                                        <MapPin size={20} className="text-[var(--color-secondary)] mt-1 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-bold text-white text-sm mb-1">Delivery Address</h4>
                                            <p className="text-xs text-gray-400 leading-relaxed">
                                                {order.shippingAddress?.name}<br />
                                                {order.shippingAddress?.addressLine1}, {order.shippingAddress?.addressLine2}<br />
                                                {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 md:justify-end">
                                        <div className="text-left md:text-right">
                                            <div className="flex items-center gap-2 md:justify-end mb-1">
                                                <CreditCard size={16} className="text-[var(--color-secondary)]" />
                                                <h4 className="font-bold text-white text-sm">Payment Info</h4>
                                            </div>
                                            <p className="text-xs text-gray-400">
                                                Method: <span className="text-black font-medium">{order.paymentMethod}</span>
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                Status: <span className={`font-medium ${order.paymentStatus === 'paid' ? 'text-green-400' : 'text-yellow-400'}`}>{order.paymentStatus?.toUpperCase()}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
