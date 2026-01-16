import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addToCartApi } from '../../api/cart';
import { ShoppingCart, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const LadduCard = ({ product }) => {
    const navigate = useNavigate();
    const [added, setAdded] = useState(false);

    const name = product?.name;
    const img = product?.img;
    // Fallback price string logic if needed, but we rely on numeric prices mostly
    const description = product?.description;
    const category = product?.category;
    const id = product?.id || product?._id;

    // Price display logic
    const displayPrice = product?.finalPrice || product?.price;
    const originalPrice = product?.price;
    const discount = product?.discountPercent;

    const handleAddToCart = async (e) => {
        e.stopPropagation();
        try {
            await addToCartApi({ productId: id, quantity: 1 });
            window.dispatchEvent(new Event('cart-updated')); // Notify Navbar
            setAdded(true);
            toast.success(`${name} added to cart!`, {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            setTimeout(() => setAdded(false), 2000);
        } catch (error) {
            console.error("Failed to add to cart:", error);
            // Optional: toast.error("Log in to add items!"); 
        }
    };

    const handleViewDetails = () => {
        navigate(`/product/${id}`);
    };

    return (
        <div className="bg-[var(--color-muted)] p-6 rounded-[35px] shadow-xl border border-white/5 flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl group relative overflow-hidden">
            {category && (
                <div className="absolute top-4 right-4 bg-[var(--color-secondary)] text-[var(--color-primary)] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter z-10">
                    {category}
                </div>
            )}
            <div
                className="w-full h-56 md:h-64 overflow-hidden rounded-[25px] mb-6 cursor-pointer"
                onClick={handleViewDetails}
            >
                <img
                    src={img}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>
            <h3
                className="text-xl md:text-2xl font-bold text-[var(--color-text)] mb-2 cursor-pointer hover:text-[var(--color-secondary)] transition-colors"
                onClick={handleViewDetails}
            >
                {name}
            </h3>
            <p className="text-xs md:text-sm text-gray-400 italic mb-4 line-clamp-2">{description}</p>
            <div className="flex flex-col items-center mb-6">
                <div className="text-lg md:text-xl font-bold text-[var(--color-secondary)]">
                    ₹{displayPrice} / kg
                </div>
                {discount > 0 && (
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-500 line-through">₹{originalPrice}</span>
                        <span className="text-xs text-green-500 font-bold">{discount}% OFF</span>
                    </div>
                )}
            </div>

            <button
                onClick={handleAddToCart}
                disabled={added}
                className={`w-full py-2 md:py-4 rounded-2xl font-bold transition-all duration-300 overflow-hidden relative group shadow-md flex items-center justify-center gap-2 ${added
                    ? 'bg-green-600 text-white scale-95 shadow-inner'
                    : 'bg-[var(--color-secondary)] text-[var(--color-primary)] hover:opacity-90'
                    }`}
                style={!added ? { backgroundColor: 'var(--color-secondary)' } : {}}
            >
                {added ? (
                    <>
                        <CheckCircle size={16} />
                        <span className="text-xs md:text-base">Added!</span>
                    </>
                ) : (
                    <>
                        <ShoppingCart size={16} />
                        <span className="text-xs md:text-base">Add To Cart</span>
                    </>
                )}
            </button>
        </div>
    );
};

export default LadduCard;
