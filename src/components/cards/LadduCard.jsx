import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addToCartApi } from '../../api/cart';
import { ShoppingCart, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

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

    const checkAuth = async () => {
        const token = localStorage.getItem('userToken');
        if (!token) {
            const result = await Swal.fire({
                title: 'Not Logged In',
                text: 'Please login first to add items to cart!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: 'var(--color-secondary)',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login Now',
                background: 'var(--color-muted)',
                color: '#fff'
            });

            if (result.isConfirmed) {
                navigate('/login');
            }
            return false;
        }
        return true;
    };

    const handleAddToCart = async (e) => {
        e.stopPropagation();

        const isAuth = await checkAuth();
        if (!isAuth) return;

        try {
            await addToCartApi({ productId: id, quantity: 1 });
            window.dispatchEvent(new Event('cart-updated')); // Notify Navbar
            setAdded(true);
            toast.success(`${name} added to cart!`, {
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
        <div
            onClick={handleViewDetails}
            className="bg-[var(--color-muted)] p-5 md:p-5 rounded-[30px] md:rounded-[35px] shadow-xl border border-white/5 flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl group relative overflow-hidden h-full cursor-pointer"
        >
            {category && (
                <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-[var(--color-secondary)] text-[var(--color-primary)] text-[10px] md:text-[10px] font-bold px-2.5 md:px-3 py-1 md:py-1 rounded-full uppercase tracking-tighter z-10">
                    {category}
                </div>
            )}
            <div
                className="w-full h-48 md:h-52 overflow-hidden rounded-[22px] md:rounded-[25px] mb-4 md:mb-4"
            >
                <img
                    src={img}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>
            <h3
                className="text-xl md:text-2xl font-bold text-[var(--color-text)] mb-1.5 md:mb-2 hover:text-[var(--color-secondary)] transition-colors line-clamp-1"
            >
                {name}
            </h3>
            <p className="text-xs md:text-sm text-gray-400 italic mb-4 md:mb-3 line-clamp-2 px-1">{description}</p>
            <div className="flex flex-col items-center mb-5 md:mb-4">
                <div className="text-lg md:text-xl font-bold text-[var(--color-secondary)]">
                    ₹{displayPrice} / kg
                </div>
                {discount > 0 && (
                    <div className="flex items-center gap-2 md:gap-2 mt-1 md:mt-1">
                        <span className="text-xs md:text-sm text-gray-500 line-through">₹{originalPrice}</span>
                        <span className="text-[10px] md:text-xs text-green-500 font-bold">{discount}% OFF</span>
                    </div>
                )}
            </div>

            <div className="flex gap-2 w-full mt-auto" onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={handleAddToCart}
                    disabled={added}
                    className={`flex-1 py-3 md:py-3 rounded-xl md:rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 text-xs md:text-sm ${added
                        ? 'bg-green-600 text-white shadow-inner'
                        : 'bg-[var(--color-primary)] text-[var(--color-secondary)] border border-[var(--color-secondary)]/30 hover:bg-[var(--color-secondary)]/10'
                        }`}
                >
                    {added ? (
                        <>
                            <CheckCircle size={15} className="md:w-4 md:h-4" />
                            <span>Added!</span>
                        </>
                    ) : (
                        <>
                            <ShoppingCart size={15} className="md:w-4 md:h-4" />
                            <span>Cart</span>
                        </>
                    )}
                </button>
                <button
                    onClick={async (e) => {
                        e.stopPropagation();

                        const isAuth = await checkAuth();
                        if (!isAuth) return;

                        try {
                            await addToCartApi({ productId: id, quantity: 1 });
                            window.dispatchEvent(new Event('cart-updated'));
                            navigate('/shop');
                        } catch (error) {
                            console.error("Buy now failed:", error);
                        }
                    }}
                    className="flex-1 py-3 bg-[var(--color-secondary)] text-[var(--color-primary)] rounded-xl md:rounded-2xl font-bold hover:opacity-90 transition-all shadow-md text-xs md:text-sm"
                >
                    Buy Now
                </button>
            </div>
        </div>
    );
};

export default LadduCard;

