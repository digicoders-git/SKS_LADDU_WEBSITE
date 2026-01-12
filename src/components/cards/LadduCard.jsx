import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { ShoppingCart, CheckCircle } from 'lucide-react';

const LadduCard = ({ product }) => {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    const name = product?.name;
    const img = product?.img;
    const priceStr = product?.priceStr || product?.price;
    const description = product?.description;
    const category = product?.category;

    const handleAddToCart = () => {
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000); // Reset after 2 seconds
    };

    return (
        <div className="bg-white p-6 rounded-[35px] shadow-xl border border-black/5 flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl group relative overflow-hidden">
            {category && (
                <div className="absolute top-4 right-4 bg-[var(--color-secondary)] text-[var(--color-maroon)] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter z-10">
                    {category}
                </div>
            )}
            <div className="w-full h-56 md:h-64 overflow-hidden rounded-[25px] mb-6">
                <img
                    src={img}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-[var(--color-maroon)] mb-2">{name}</h3>
            <p className="text-xs md:text-sm text-gray-500 italic mb-4 line-clamp-2">{description}</p>
            <div className="text-lg md:text-xl font-bold text-[var(--color-secondary)] mb-6">{priceStr}</div>
            <button
                onClick={handleAddToCart}
                disabled={added}
                className={`w-full py-3 md:py-4 rounded-2xl font-bold transition-all duration-300 overflow-hidden relative group shadow-md flex items-center justify-center gap-2 ${added
                        ? 'bg-green-600 text-white scale-95 shadow-inner'
                        : 'bg-[var(--color-maroon)] text-white hover:bg-[#a5231b]'
                    }`}
                style={!added ? { backgroundColor: '#8B1D16' } : {}}
            >
                {added ? (
                    <>
                        <CheckCircle size={18} />
                        <span className="text-sm md:text-base">Added!</span>
                    </>
                ) : (
                    <>
                        <ShoppingCart size={18} />
                        <span className="text-sm md:text-base">Add To Cart</span>
                    </>
                )}
            </button>
        </div>
    );
};

export default LadduCard;
