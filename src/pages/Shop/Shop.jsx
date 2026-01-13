import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, Trash2, MapPin, CreditCard, CheckCircle2, Plus, Minus, Banknote, Smartphone, X } from 'lucide-react';
import Footer from '../../components/layout/Footer';

const Shop = () => {
    const { cart, removeFromCart, updateQuantity, totalAmount } = useCart();
    const sectionRefs = useRef([]);
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [selectedItem, setSelectedItem] = useState(null);
    const [address, setAddress] = useState({
        name: '',
        phone: '',
        location: '',
        city: 'Sandila'
    });

    const handleQuantityChange = (uniqueId, change) => {
        const item = cart.find(item => item.uniqueId === uniqueId);
        const newQuantity = (item.quantity || 1) + change;
        if (newQuantity > 0) {
            updateQuantity(uniqueId, newQuantity);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        sectionRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    const addToRefs = (el) => {
        if (el && !sectionRefs.current.includes(el)) {
            sectionRefs.current.push(el);
        }
    };

    const handleConfirmOrder = () => {
        if (!address.name || !address.phone || !address.location) {
            alert("Please fill in all delivery details.");
            return;
        }
        alert("Thank you! Your order has been placed successfully. Our representative will contact you shortly.");
    };

    return (
        <div className="bg-[var(--color-primary)] text-[var(--color-text)] font-[var(--font-body)] min-h-screen">
            {/* Title Section */}
            <div className="py-12 px-8 md:px-24 bg-[var(--color-muted)] border-b border-[var(--color-secondary)]/10 mb-10 shadow-lg">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-secondary)]">Review Your Order</h1>
                        <p className="text-sm md:text-base text-gray-400 mt-2">Check your items and provide delivery details.</p>
                    </div>
                    <div className="bg-[var(--color-primary)] px-6 py-3 rounded-2xl border border-[var(--color-secondary)]/20 flex items-center gap-3">
                        <ShoppingBag size={20} className="text-[var(--color-secondary)]" />
                        <div>
                            <span className="text-[10px] md:text-xs text-gray-400 uppercase font-bold tracking-wider">Total Items: </span>
                            <span className="text-lg md:text-xl font-bold text-[var(--color-secondary)]">{cart.length}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 md:px-8">
                {cart.length === 0 ? (
                    <div className="bg-[var(--color-muted)] p-12 md:p-20 rounded-3xl text-center border border-dashed border-[var(--color-secondary)]/20 shadow-lg">
                        <div className="text-5xl md:text-6xl mb-6">🛒</div>
                        <h2 className="text-xl md:text-2xl font-bold text-[var(--color-secondary)] mb-4 font-[var(--font-heading)]">Your tray is empty!</h2>
                        <p className="text-sm md:text-base text-gray-400 mb-8 max-w-md mx-auto italic">It seems you haven't added any laddus to your order yet. Head over to our gallery to pick your favorites.</p>
                        <a
                            href="/laddus"
                            className="inline-block px-8 md:px-10 py-3 md:py-4 bg-[var(--color-secondary)] text-[var(--color-primary)] rounded-xl font-bold hover:bg-[#ffe033] transition-all no-underline shadow-[0_4px_15px_rgba(255,212,0,0.3)] hover:shadow-[0_6px_20px_rgba(255,212,0,0.4)] text-sm md:text-base"
                        >
                            Browse Our Laddus
                        </a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">

                        <div className="lg:col-span-2 space-y-6 lg:space-y-10">
                            {/* Selected Items List */}
                            <div ref={addToRefs} className="scroll-section space-y-6">
                                <h2 className="text-lg md:text-xl font-bold text-[var(--color-secondary)] mb-6 flex items-center gap-3 font-[var(--font-heading)]">
                                    Selected Items
                                </h2>
                                {cart.map((item) => (
                                    <div key={item.uniqueId} className="bg-[var(--color-muted)] p-3 md:p-4 rounded-3xl border border-[var(--color-secondary)]/10 shadow-lg hover:border-[var(--color-secondary)]/30 transition-all">
                                        <div className="flex flex-row items-center gap-3 md:gap-4">
                                            {/* Image - Compact on mobile */}
                                            <div
                                                className="w-16 h-16 md:w-24 md:h-24 rounded-xl md:rounded-2xl overflow-hidden border border-[var(--color-secondary)]/20 flex-shrink-0 cursor-pointer"
                                                onClick={() => setSelectedItem(item)}
                                            >
                                                <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                                            </div>

                                            {/* Content - Row layout maintained */}
                                            <div className="flex-grow flex flex-col md:block">
                                                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 md:gap-2">
                                                    <div>
                                                        <h3
                                                            className="font-bold text-sm md:text-base text-[var(--color-text)] cursor-pointer hover:text-[var(--color-secondary)] transition-colors line-clamp-1"
                                                            onClick={() => setSelectedItem(item)}
                                                        >{item.name}</h3>
                                                        <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest font-bold">{item.category}</p>
                                                    </div>
                                                    <p className="font-bold text-sm md:text-lg text-[var(--color-secondary)] md:mt-0">₹{item.price * (item.quantity || 1)}</p>
                                                </div>

                                                {/* Controls Row */}
                                                <div className="mt-2 md:mt-4 flex flex-row items-center justify-between gap-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex items-center gap-1 md:gap-2 bg-[var(--color-primary)] rounded-lg p-0.5 md:p-1 border border-[var(--color-secondary)]/10">
                                                            <button
                                                                onClick={() => handleQuantityChange(item.uniqueId, -1)}
                                                                className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center bg-[var(--color-muted)] rounded hover:bg-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors text-white font-bold text-base md:text-lg"
                                                            >
                                                                −
                                                            </button>
                                                            <span className="px-2 md:px-3 text-xs md:text-sm font-bold min-w-[1.5rem] md:min-w-[2rem] text-center text-white">{item.quantity || 1}</span>
                                                            <button
                                                                onClick={() => handleQuantityChange(item.uniqueId, 1)}
                                                                className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center bg-[var(--color-muted)] rounded hover:bg-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors text-white font-bold text-base md:text-lg"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                        <p className="text-xs text-gray-500 italic hidden sm:block">1.0 kg</p>
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(item.uniqueId)}
                                                        className="flex items-center justify-center gap-1 text-red-400 hover:text-red-300 font-bold text-[10px] md:text-sm uppercase transition-all px-2 py-1 md:px-3 md:py-2 rounded-lg hover:bg-white/5"
                                                    >
                                                        <Trash2 size={14} className="md:w-4 md:h-4" />
                                                        <span>Remove</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Delivery Location Section */}
                            <div ref={addToRefs} className="scroll-section space-y-6">
                                <h2 className="text-lg md:text-xl font-bold text-[var(--color-secondary)] mb-4 flex items-center gap-2 font-[var(--font-heading)]">
                                    <MapPin size={20} className="text-[var(--color-secondary)]" />
                                    Drop Location
                                </h2>
                                <div className="bg-[var(--color-muted)] p-6 md:p-8 rounded-[35px] shadow-lg border border-[var(--color-secondary)]/10 space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase">Full Name</label>
                                            <input
                                                type="text"
                                                placeholder="Enter your name"
                                                className="w-full px-5 py-3.5 bg-[var(--color-primary)] text-white border border-[var(--color-secondary)]/10 rounded-2xl focus:border-[var(--color-secondary)] outline-none text-sm font-medium transition-colors placeholder-gray-600"
                                                value={address.name}
                                                onChange={(e) => setAddress({ ...address, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase">Phone Number</label>
                                            <input
                                                type="tel"
                                                placeholder="Mobile number"
                                                className="w-full px-5 py-3.5 bg-[var(--color-primary)] text-white border border-[var(--color-secondary)]/10 rounded-2xl focus:border-[var(--color-secondary)] outline-none text-sm font-medium transition-colors placeholder-gray-600"
                                                value={address.phone}
                                                onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase">Full Delivery Address</label>
                                        <textarea
                                            placeholder="House No, Street Area, Landmark"
                                            rows="3"
                                            className="w-full px-5 py-4 bg-[var(--color-primary)] text-white border border-[var(--color-secondary)]/10 rounded-[25px] focus:border-[var(--color-secondary)] outline-none text-sm font-medium resize-none transition-colors placeholder-gray-600"
                                            value={address.location}
                                            onChange={(e) => setAddress({ ...address, location: e.target.value })}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Methods Section */}
                            <div ref={addToRefs} className="scroll-section space-y-6">
                                <h2 className="text-lg md:text-xl font-bold text-[var(--color-secondary)] mb-4 flex items-center gap-2 font-[var(--font-heading)]">
                                    <CreditCard size={20} className="text-[var(--color-secondary)]" />
                                    Payment Method
                                </h2>
                                <div className="grid grid-cols-1 gap-4">
                                    <div
                                        onClick={() => setPaymentMethod('cod')}
                                        className={`p-6 rounded-[30px] border-2 cursor-pointer transition-all flex items-center justify-between ${paymentMethod === 'cod' ? 'border-[var(--color-secondary)] bg-[var(--color-secondary)]/10' : 'border-[var(--color-secondary)]/10 bg-[var(--color-muted)] hover:border-[var(--color-secondary)]/30'}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-green-900/30 rounded-2xl flex items-center justify-center border border-green-500/20">
                                                <Banknote className="w-6 h-6 text-green-400" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-[var(--color-text)]">Cash on Delivery</h4>
                                                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Pay when you receive</p>
                                            </div>
                                        </div>
                                        {paymentMethod === 'cod' && <CheckCircle2 className="text-[var(--color-secondary)]" size={24} />}
                                    </div>

                                    <div
                                        onClick={() => setPaymentMethod('upi')}
                                        className={`p-6 rounded-[30px] border-2 cursor-pointer transition-all flex items-center justify-between ${paymentMethod === 'upi' ? 'border-[var(--color-secondary)] bg-[var(--color-secondary)]/10' : 'border-[var(--color-secondary)]/10 bg-[var(--color-muted)] hover:border-[var(--color-secondary)]/30'}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-blue-900/30 rounded-2xl flex items-center justify-center border border-blue-500/20">
                                                <Smartphone className="w-6 h-6 text-blue-400" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-[var(--color-text)]">UPI Payment</h4>
                                                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">PhonePe, GPay, Paytm</p>
                                            </div>
                                        </div>
                                        {paymentMethod === 'upi' && <CheckCircle2 className="text-[var(--color-secondary)]" size={24} />}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary Summary */}
                        <div className="lg:col-span-1">
                            <div ref={addToRefs} className="scroll-section lg:sticky lg:top-24">
                                <h2 className="text-lg md:text-xl font-bold text-[var(--color-secondary)] mb-6 flex items-center gap-3 font-[var(--font-heading)]">
                                    Final Bill
                                </h2>
                                <div className="bg-[var(--color-muted)] p-4 lg:p-6 xl:p-8 rounded-[40px] border border-[var(--color-secondary)]/10 shadow-xl">
                                    <div className="space-y-4 mb-8">
                                        <div className="flex justify-between text-gray-400 text-sm md:text-base">
                                            <span>Items Total</span>
                                            <span className="font-bold text-white">₹{totalAmount}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-400 text-sm md:text-base">
                                            <span>Shipping Charges</span>
                                            <span className="font-bold text-green-400">₹50</span>
                                        </div>
                                        <div className="flex justify-between text-gray-400 text-sm md:text-base">
                                            <span>Handling Fee</span>
                                            <span className="font-bold text-white">₹20</span>
                                        </div>
                                    </div>

                                    <div className="border-t border-dashed border-gray-600 pt-6">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-base md:text-lg font-bold text-white">Grand Total</span>
                                            <span className="text-2xl md:text-3xl font-extrabold text-[var(--color-secondary)]">₹{totalAmount + 70}</span>
                                        </div>
                                        <p className="text-[10px] text-gray-500 text-right italic">Inclusive of all taxes</p>
                                    </div>

                                    <button
                                        onClick={handleConfirmOrder}
                                        className="w-full py-4 md:py-5 bg-[var(--color-secondary)] text-[var(--color-primary)] rounded-2xl font-bold text-base md:text-lg mt-8 md:mt-10 hover:bg-[#ffe033] transition-all shadow-[0_4px_15px_rgba(255,212,0,0.3)] hover:shadow-[0_6px_20px_rgba(255,212,0,0.4)] active:scale-95"
                                    >
                                        Place Order
                                    </button>

                                    <p className="text-center text-[9px] md:text-[10px] text-gray-500 mt-6 leading-relaxed px-2">
                                        By clicking place order, you agree to our Terms of Service and Privacy Policy. Our delivery partner will contact you for location verification.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Item Detail Modal */}
            {selectedItem && (
                <div className="fixed inset-0 backdrop-blur-md bg-[var(--color-primary)]/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-[var(--color-muted)] rounded-3xl max-w-md w-full p-6 relative border border-[var(--color-secondary)]/20 shadow-2xl">
                        <button
                            onClick={() => setSelectedItem(null)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            <X size={24} />
                        </button>
                        <div className="text-center">
                            <img
                                src={selectedItem.img}
                                alt={selectedItem.name}
                                className="w-48 h-48 object-cover rounded-2xl mx-auto mb-4 border-2 border-[var(--color-secondary)]/20"
                            />
                            <h3 className="text-xl font-bold text-[var(--color-secondary)] mb-2">{selectedItem.name}</h3>
                            <p className="text-sm text-gray-400 uppercase tracking-wider mb-4">{selectedItem.category}</p>
                            <p className="text-2xl font-bold text-white mb-4">₹{selectedItem.price}</p>
                            <p className="text-sm text-gray-500 mb-6">Net Quantity: 1.0 kg</p>
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="w-full py-3 bg-[var(--color-secondary)] text-[var(--color-primary)] rounded-xl font-bold hover:bg-[#ffe033] transition-all"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-16">
                <Footer />
            </div>
        </div>
    );
};

export default Shop;