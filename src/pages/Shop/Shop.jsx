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
        <div className="bg-gray-50 text-gray-800 font-[var(--font-body)] min-h-screen">
            {/* Title Section */}
            <div className="py-12 px-8 md:px-24 bg-white border-b border-gray-100 mb-10">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-maroon)]">Review Your Order</h1>
                        <p className="text-sm md:text-base text-gray-500 mt-2">Check your items and provide delivery details.</p>
                    </div>
                    <div className="bg-[var(--color-accent)]/30 px-6 py-3 rounded-2xl border border-[var(--color-secondary)]/10 flex items-center gap-3">
                        <ShoppingBag size={20} className="text-[var(--color-maroon)]" />
                        <div>
                            <span className="text-[10px] md:text-xs text-gray-500 uppercase font-bold tracking-wider">Total Items: </span>
                            <span className="text-lg md:text-xl font-bold text-[var(--color-maroon)]">{cart.length}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 md:px-8">
                {cart.length === 0 ? (
                    <div className="bg-white p-12 md:p-20 rounded-3xl text-center border border-dashed border-gray-200 shadow-sm">
                        <div className="text-5xl md:text-6xl mb-6">🛒</div>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-700 mb-4 font-[var(--font-heading)]">Your tray is empty!</h2>
                        <p className="text-sm md:text-base text-gray-400 mb-8 max-w-md mx-auto italic">It seems you haven't added any laddus to your order yet. Head over to our gallery to pick your favorites.</p>
                        <a
                            href="/laddus"
                            className="inline-block px-8 md:px-10 py-3 md:py-4 bg-[var(--color-maroon)] text-white rounded-xl font-bold hover:bg-[#a5231b] transition-all no-underline shadow-lg text-sm md:text-base"
                        >
                            Browse Our Laddus
                        </a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">

                        <div className="lg:col-span-2 space-y-6 lg:space-y-10">
                            {/* Selected Items List */}
                            <div ref={addToRefs} className="scroll-section space-y-6">
                                <h2 className="text-lg md:text-xl font-bold text-gray-700 mb-6 flex items-center gap-3 font-[var(--font-heading)]">
                                    Selected Items
                                </h2>
                                {cart.map((item) => (
                                    <div key={item.uniqueId} className="bg-white p-4 rounded-3xl border border-gray-50 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                            <div 
                                                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-gray-100 flex-shrink-0 cursor-pointer mx-auto sm:mx-0"
                                                onClick={() => setSelectedItem(item)}
                                            >
                                                <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-grow text-center sm:text-left">
                                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                                                    <div>
                                                        <h3 
                                                            className="font-bold text-base text-gray-800 cursor-pointer hover:text-[var(--color-maroon)]"
                                                            onClick={() => setSelectedItem(item)}
                                                        >{item.name}</h3>
                                                        <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">{item.category}</p>
                                                    </div>
                                                    <p className="font-bold text-lg text-[var(--color-maroon)] mt-2 sm:mt-0">₹{item.price * (item.quantity || 1)}</p>
                                                </div>
                                                <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                                    <div className="flex items-center justify-center sm:justify-start gap-3">
                                                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                                                            <button
                                                                onClick={() => handleQuantityChange(item.uniqueId, -1)}
                                                                className="w-8 h-8 flex items-center justify-center bg-white rounded hover:bg-gray-200 transition-colors text-black font-bold text-lg"
                                                            >
                                                                −
                                                            </button>
                                                            <span className="px-3 text-sm font-bold min-w-[2rem] text-center">{item.quantity || 1}</span>
                                                            <button
                                                                onClick={() => handleQuantityChange(item.uniqueId, 1)}
                                                                className="w-8 h-8 flex items-center justify-center bg-white rounded hover:bg-gray-200 transition-colors text-black font-bold text-lg"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                        <p className="text-xs text-gray-400 italic hidden sm:block">Net Quantity: 1.0 kg</p>
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(item.uniqueId)}
                                                        className="flex items-center justify-center gap-2 text-red-600 hover:text-red-800 font-bold text-sm uppercase transition-all px-3 py-2 rounded-lg hover:bg-red-50"
                                                    >
                                                        <Trash2 size={16} />
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
                                <h2 className="text-lg md:text-xl font-bold text-gray-700 mb-4 flex items-center gap-2 font-[var(--font-heading)]">
                                    <MapPin size={20} className="text-[var(--color-maroon)]" />
                                    Drop Location
                                </h2>
                                <div className="bg-white p-6 md:p-8 rounded-[35px] shadow-sm border border-gray-100 space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase">Full Name</label>
                                            <input
                                                type="text"
                                                placeholder="Enter your name"
                                                className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[var(--color-secondary)] outline-none text-sm font-medium"
                                                value={address.name}
                                                onChange={(e) => setAddress({ ...address, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase">Phone Number</label>
                                            <input
                                                type="tel"
                                                placeholder="Mobile number"
                                                className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[var(--color-secondary)] outline-none text-sm font-medium"
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
                                            className="w-full px-5 py-4 bg-gray-50 border-none rounded-[25px] focus:ring-2 focus:ring-[var(--color-secondary)] outline-none text-sm font-medium resize-none"
                                            value={address.location}
                                            onChange={(e) => setAddress({ ...address, location: e.target.value })}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Methods Section */}
                            <div ref={addToRefs} className="scroll-section space-y-6">
                                <h2 className="text-lg md:text-xl font-bold text-gray-700 mb-4 flex items-center gap-2 font-[var(--font-heading)]">
                                    <CreditCard size={20} className="text-[var(--color-maroon)]" />
                                    Payment Method
                                </h2>
                                <div className="grid grid-cols-1 gap-4">
                                    <div
                                        onClick={() => setPaymentMethod('cod')}
                                        className={`p-6 rounded-[30px] border-2 cursor-pointer transition-all flex items-center justify-between ${paymentMethod === 'cod' ? 'border-[var(--color-maroon)] bg-[var(--color-maroon)]/5' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                                                <Banknote className="w-6 h-6 text-green-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-800">Cash on Delivery</h4>
                                                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Pay when you receive</p>
                                            </div>
                                        </div>
                                        {paymentMethod === 'cod' && <CheckCircle2 className="text-[var(--color-maroon)]" size={24} />}
                                    </div>

                                    <div
                                        onClick={() => setPaymentMethod('upi')}
                                        className={`p-6 rounded-[30px] border-2 cursor-pointer transition-all flex items-center justify-between ${paymentMethod === 'upi' ? 'border-[var(--color-maroon)] bg-[var(--color-maroon)]/5' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                                                <Smartphone className="w-6 h-6 text-blue-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-800">UPI Payment</h4>
                                                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">PhonePe, GPay, Paytm</p>
                                            </div>
                                        </div>
                                        {paymentMethod === 'upi' && <CheckCircle2 className="text-[var(--color-maroon)]" size={24} />}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary Summary */}
                        <div className="lg:col-span-1">
                            <div ref={addToRefs} className="scroll-section lg:sticky lg:top-24">
                                <h2 className="text-lg md:text-xl font-bold text-gray-700 mb-6 flex items-center gap-3 font-[var(--font-heading)]">
                                    Final Bill
                                </h2>
                                <div className="bg-white p-4 lg:p-6 xl:p-8 rounded-[40px] border border-gray-100 shadow-xl">
                                    <div className="space-y-4 mb-8">
                                        <div className="flex justify-between text-gray-500 text-sm md:text-base">
                                            <span>Items Total</span>
                                            <span className="font-bold text-gray-800">₹{totalAmount}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-500 text-sm md:text-base">
                                            <span>Shipping Charges</span>
                                            <span className="font-bold text-green-600">₹50</span>
                                        </div>
                                        <div className="flex justify-between text-gray-500 text-sm md:text-base">
                                            <span>Handling Fee</span>
                                            <span className="font-bold text-gray-800">₹20</span>
                                        </div>
                                    </div>

                                    <div className="border-t border-dashed border-gray-200 pt-6">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-base md:text-lg font-bold text-gray-800">Grand Total</span>
                                            <span className="text-2xl md:text-3xl font-extrabold text-[var(--color-maroon)]">₹{totalAmount + 70}</span>
                                        </div>
                                        <p className="text-[10px] text-gray-400 text-right italic">Inclusive of all taxes</p>
                                    </div>

                                    <button
                                        onClick={handleConfirmOrder}
                                        className="w-full py-4 md:py-5 bg-[var(--color-maroon)] text-white rounded-2xl font-bold text-base md:text-lg mt-8 md:mt-10 hover:bg-[#a5231b] transition-all shadow-lg hover:shadow-2xl active:scale-95"
                                    >
                                        Place Order
                                    </button>

                                    <p className="text-center text-[9px] md:text-[10px] text-gray-400 mt-6 leading-relaxed px-2">
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
                <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl max-w-md w-full p-6 relative">
                        <button
                            onClick={() => setSelectedItem(null)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <X size={24} />
                        </button>
                        <div className="text-center">
                            <img 
                                src={selectedItem.img} 
                                alt={selectedItem.name} 
                                className="w-48 h-48 object-cover rounded-2xl mx-auto mb-4"
                            />
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedItem.name}</h3>
                            <p className="text-sm text-gray-500 uppercase tracking-wider mb-4">{selectedItem.category}</p>
                            <p className="text-2xl font-bold text-[var(--color-maroon)] mb-4">₹{selectedItem.price}</p>
                            <p className="text-sm text-gray-600 mb-6">Net Quantity: 1.0 kg</p>
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="w-full py-3 bg-[var(--color-maroon)] text-white rounded-xl font-bold hover:bg-[#a5231b] transition-all"
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