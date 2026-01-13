import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Star, Package, Truck, Shield } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-toastify';
import besanLaddu from '../../assets/images/besan-laddu.png';
import kesarLaddu from '../../assets/images/kesar-laddu.png';
import nariyalLaddu from '../../assets/images/nariyal-laddu.png';
import heroLaddus from '../../assets/images/hero-laddus.png';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    // All products data
    const allProducts = [
        { id: 1, name: 'Classic Besan Laddu', img: besanLaddu, price: 480, priceStr: '₹480 / kg', description: 'Hand-roasted gram flour blended with pure desi ghee. A timeless tradition.', category: 'Classic', ingredients: 'Gram Flour, Desi Ghee, Sugar, Cardamom', shelfLife: '15 days' },
        { id: 2, name: 'Kesar Dry Fruit Laddu', img: kesarLaddu, price: 750, priceStr: '₹750 / kg', description: 'Rich saffron infusion with premium cashews, almonds, and pistachios.', category: 'Dry Fruit', ingredients: 'Cashews, Almonds, Pistachios, Saffron, Sugar, Ghee', shelfLife: '20 days' },
        { id: 3, name: 'Nariyal Laddu', img: nariyalLaddu, price: 380, priceStr: '₹380 / kg', description: 'Juicy coconut crumbles bound with condensed milk and cardamom.', category: 'Exotic', ingredients: 'Fresh Coconut, Condensed Milk, Sugar, Cardamom', shelfLife: '10 days' },
        { id: 4, name: 'Motichoor Laddu', img: heroLaddus, price: 520, priceStr: '₹520 / kg', description: 'Tiny pearls of gram flour deep-fried and soaked in flavored syrup.', category: 'Classic', ingredients: 'Gram Flour, Sugar Syrup, Ghee, Cardamom', shelfLife: '12 days' },
        { id: 5, name: 'Mixed Nut Laddu', img: kesarLaddu, price: 820, priceStr: '₹820 / kg', description: 'A powerhouse of energy made entirely of crushed dried fruits and honey.', category: 'Dry Fruit', ingredients: 'Mixed Nuts, Dates, Honey, Dried Fruits', shelfLife: '25 days' },
        { id: 6, name: 'Rose Petal Laddu', img: nariyalLaddu, price: 550, priceStr: '₹550 / kg', description: 'Elegant laddus infused with organic rose water and edible petals.', category: 'Exotic', ingredients: 'Rose Petals, Rose Water, Khoya, Sugar, Ghee', shelfLife: '8 days' },
        { id: 7, name: 'Sugar-Free Dates Laddu', img: besanLaddu, price: 680, priceStr: '₹680 / kg', description: 'Naturally sweetened with premium dates and no added refined sugar.', category: 'Sugar-Free', ingredients: 'Dates, Almonds, Cashews, Ghee', shelfLife: '18 days' },
        { id: 8, name: 'Gond Laddu', img: heroLaddus, price: 700, priceStr: '₹700 / kg', description: 'Traditional winter special made with edible gum and whole wheat.', category: 'Seasonal', ingredients: 'Edible Gum, Wheat Flour, Jaggery, Ghee, Dry Fruits', shelfLife: '30 days' },
        { id: 9, name: 'Flax Seed Laddu', img: besanLaddu, price: 600, priceStr: '₹600 / kg', description: 'Healthy oats and flax seeds for a guilt-free sweet experience.', category: 'Sugar-Free', ingredients: 'Flax Seeds, Oats, Jaggery, Ghee, Sesame', shelfLife: '22 days' },
        { id: 101, name: 'Classic Besan Laddu', img: besanLaddu, price: 480, priceStr: '₹480 / kg', description: 'Hand-roasted gram flour blended with pure desi ghee.', category: 'Classic', ingredients: 'Gram Flour, Desi Ghee, Sugar, Cardamom', shelfLife: '15 days' },
        { id: 102, name: 'Kesar Dry Fruit Laddu', img: kesarLaddu, price: 750, priceStr: '₹750 / kg', description: 'Rich saffron infusion with premium dry fruits.', category: 'Dry Fruit', ingredients: 'Cashews, Almonds, Pistachios, Saffron, Sugar, Ghee', shelfLife: '20 days' },
        { id: 103, name: 'Nariyal Laddu', img: nariyalLaddu, price: 380, priceStr: '₹380 / kg', description: 'Soft coconut crumbles with a hint of cardamom.', category: 'Exotic', ingredients: 'Fresh Coconut, Condensed Milk, Sugar, Cardamom', shelfLife: '10 days' }
    ];

    const product = allProducts.find(p => p.id === parseInt(id));

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[var(--color-primary)]">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-[var(--color-secondary)] mb-4">Product Not Found</h2>
                    <Link to="/laddus" className="text-white hover:text-[var(--color-secondary)] hover:underline transition-colors">
                        ← Back to Products
                    </Link>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(product);
        toast.success(`${product.name} added to cart!`, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    return (
        <div className="bg-[var(--color-primary)] min-h-screen py-12 px-6 md:px-24 font-[var(--font-body)]">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-[var(--color-secondary)] hover:text-white mb-8 font-semibold transition-colors"
            >
                <ArrowLeft size={20} />
                Back
            </button>

            <div className="max-w-6xl mx-auto bg-[var(--color-muted)] rounded-3xl shadow-2xl overflow-hidden border border-[var(--color-secondary)]/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {/* Product Image */}
                    <div className="p-8 md:p-12 flex items-center justify-center bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-muted)] relative">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,212,0,0.1)_0%,transparent_70%)] opacity-50"></div>
                        <img
                            src={product.img}
                            alt={product.name}
                            className="w-full max-w-md rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300 relative z-10"
                        />
                    </div>

                    {/* Product Details */}
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                        <div className="inline-block px-4 py-1 bg-[var(--color-secondary)] text-[var(--color-primary)] rounded-full text-sm font-bold mb-4 w-fit">
                            {product.category}
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 font-[var(--font-heading)]">
                            {product.name}
                        </h1>

                        <div className="flex items-center gap-2 mb-6">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={20} className="fill-[var(--color-secondary)] text-[var(--color-secondary)]" />
                            ))}
                            <span className="text-gray-400 text-sm ml-2">(4.9/5 from 120 reviews)</span>
                        </div>

                        <p className="text-gray-300 text-lg leading-relaxed mb-6">
                            {product.description}
                        </p>

                        <div className="bg-[var(--color-primary)]/50 rounded-2xl p-6 mb-6 border border-[var(--color-secondary)]/10">
                            <h3 className="font-bold text-[var(--color-secondary)] mb-3 flex items-center gap-2">
                                <Package size={20} />
                                Product Details
                            </h3>
                            <div className="space-y-2 text-sm text-gray-300">
                                <p><span className="font-semibold text-white">Ingredients:</span> {product.ingredients}</p>
                                <p><span className="font-semibold text-white">Shelf Life:</span> {product.shelfLife}</p>
                                <p><span className="font-semibold text-white">Net Weight:</span> 1 kg</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <p className="text-sm text-gray-400 mb-1">Price per kg</p>
                                <p className="text-4xl font-bold text-[var(--color-secondary)]">₹{product.price}</p>
                            </div>
                        </div>

                        <div className="flex gap-4 mb-8">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-[var(--color-secondary)] text-[var(--color-primary)] py-2 md:py-4 rounded-xl font-bold text-sm md:text-lg hover:bg-[#ffe033] transition-all shadow-[0_4px_15px_rgba(255,212,0,0.3)] hover:shadow-[0_6px_20px_rgba(255,212,0,0.4)] flex items-center justify-center gap-2"
                            >
                                <ShoppingCart size={18} className="md:w-[22px] md:h-[22px]" />
                                <span className="text-xs md:text-base">Add to Cart</span>
                            </button>
                            <Link
                                to="/shop"
                                className="px-4 md:px-8 py-2 md:py-4 border-2 border-[var(--color-secondary)] text-[var(--color-secondary)] rounded-xl font-bold hover:bg-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-all flex items-center justify-center no-underline text-xs md:text-base"
                            >
                                View Cart
                            </Link>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 text-sm text-gray-400">
                                <Truck className="text-[var(--color-secondary)]" size={20} />
                                <span className="text-gray-300">Fast Delivery</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-400">
                                <Shield className="text-[var(--color-secondary)]" size={20} />
                                <span className="text-gray-300">100% Authentic</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
