import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Filter } from 'lucide-react';
import LadduCard from '../../components/cards/LadduCard';
import besanLaddu from '../../assets/images/besan-laddu.png';
import kesarLaddu from '../../assets/images/kesar-laddu.png';
import nariyalLaddu from '../../assets/images/nariyal-laddu.png';
import heroLaddus from '../../assets/images/hero-laddus.png';

const Laddus = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const sectionRefs = useRef([]);
    const dropdownRef = useRef(null);

    // Auto-close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isDropdownOpen]);


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

    const allLaddus = [
        { id: 1, name: 'Classic Besan Laddu', img: besanLaddu, price: 480, priceStr: '₹480 / kg', description: 'Hand-roasted gram flour blended with pure desi ghee. A timeless tradition.', category: 'Classic' },
        { id: 2, name: 'Kesar Dry Fruit Laddu', img: kesarLaddu, price: 750, priceStr: '₹750 / kg', description: 'Rich saffron infusion with premium cashews, almonds, and pistachios.', category: 'Dry Fruit' },
        { id: 3, name: 'Nariyal Laddu', img: nariyalLaddu, price: 380, priceStr: '₹380 / kg', description: 'Juicy coconut crumbles bound with condensed milk and cardamom.', category: 'Exotic' },
        { id: 4, name: 'Motichoor Laddu', img: heroLaddus, price: 520, priceStr: '₹520 / kg', description: 'Tiny pearls of gram flour deep-fried and soaked in flavored syrup.', category: 'Classic' },
        { id: 5, name: 'Mixed Nut Laddu', img: kesarLaddu, price: 820, priceStr: '₹820 / kg', description: 'A powerhouse of energy made entirely of crushed dried fruits and honey.', category: 'Dry Fruit' },
        { id: 6, name: 'Rose Petal Laddu', img: nariyalLaddu, price: 550, priceStr: '₹550 / kg', description: 'Elegant laddus infused with organic rose water and edible petals.', category: 'Exotic' },
        { id: 7, name: 'Sugar-Free Dates Laddu', img: besanLaddu, price: 680, priceStr: '₹680 / kg', description: 'Naturally sweetened with premium dates and no added refined sugar.', category: 'Sugar-Free' },
        { id: 8, name: 'Gond Laddu', img: heroLaddus, price: 700, priceStr: '₹700 / kg', description: 'Traditional winter special made with edible gum and whole wheat.', category: 'Seasonal' },
        { id: 9, name: 'Flax Seed Laddu', img: besanLaddu, price: 600, priceStr: '₹600 / kg', description: 'Healthy oats and flax seeds for a guilt-free sweet experience.', category: 'Sugar-Free' },
    ];

    const categories = ['All', 'Classic', 'Dry Fruit', 'Exotic', 'Sugar-Free', 'Seasonal'];


    const filteredLaddus = allLaddus.filter(laddu => {
        const matchesCategory = activeCategory === 'All' || laddu.category === activeCategory;
        const price = laddu.price;
        const min = minPrice === '' ? 0 : parseInt(minPrice);
        const max = maxPrice === '' ? 10000 : parseInt(maxPrice);
        const matchesPrice = price >= min && price <= max;
        return matchesCategory && matchesPrice;
    });

    return (
        <div className="bg-[var(--color-accent)] text-[var(--color-primary)] font-[var(--font-body)] min-h-screen pb-20 overflow-x-hidden">
            {/* Header */}
            <section className="py-16 md:py-20 px-8 text-center bg-[var(--color-maroon)] text-white rounded-b-[40px] md:rounded-b-[50px] shadow-lg">
                <h1 className="text-3xl md:text-7xl font-bold mb-4">Our Sweet Gallery</h1>
                <p className="text-base md:text-xl italic opacity-90 max-w-2xl mx-auto">
                    Explore our diverse collection of authentic Sandila laddus, handcrafted for every palate and occasion.
                </p>
            </section>

            {/* Filters Section - Static for stability */}
            <section className={`py-8 md:py-12 px-6 md:px-8 flex flex-col items-center gap-6 md:gap-10 relative ${isDropdownOpen ? 'z-50' : 'z-10'}`}>

                {/* Mobile View: Premium Custom Dropdown Filter */}
                <div
                    ref={dropdownRef}
                    className={`md:hidden w-full max-w-[280px] relative ${isDropdownOpen ? 'z-[60]' : 'z-20'}`}
                >
                    <div className="flex items-center gap-2 mb-3 text-[var(--color-maroon)] font-bold text-[10px] uppercase tracking-[0.2em] pl-2 opacity-60">
                        <Filter size={12} />
                        <span>Filter by Category</span>
                    </div>

                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`w-full bg-white flex items-center justify-between px-6 py-4 rounded-[22px] shadow-xl border border-[var(--color-secondary)]/10 transition-all active:scale-[0.98] ${isDropdownOpen ? 'ring-2 ring-[var(--color-secondary)]/30' : ''}`}
                    >
                        <span className="font-bold text-[var(--color-maroon)] text-base">{activeCategory}</span>
                        <ChevronDown className={`text-[var(--color-secondary)] transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} size={20} />
                    </button>

                    {/* Animated Dropdown Menu - Glassmorphism */}
                    <div className={`absolute top-full left-0 w-full mt-3 bg-white/95 backdrop-blur-xl rounded-[25px] shadow-2xl border border-[var(--color-secondary)]/5 overflow-hidden transition-all duration-300 origin-top ${isDropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                        <div className="p-2 py-3 flex flex-col">
                            {categories.map((cat, idx) => (
                                <button
                                    key={cat}
                                    onClick={() => {
                                        setActiveCategory(cat);
                                        setIsDropdownOpen(false);
                                    }}
                                    className={`w-full text-left px-5 py-3.5 rounded-2xl text-sm font-bold transition-all ${activeCategory === cat ? 'bg-[var(--color-maroon)] text-white' : 'text-[var(--color-maroon)] hover:bg-[var(--color-accent)]'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Laptop View: Row-based Filter */}
                <div className="hidden md:flex flex-wrap justify-center gap-3">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 border-2 ${activeCategory === cat
                                ? 'bg-[var(--color-maroon)] text-white border-[var(--color-maroon)] shadow-lg scale-105'
                                : 'bg-white text-[var(--color-maroon)] border-white hover:border-[var(--color-secondary)] hover:bg-[var(--color-accent)]'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Price Filter - INPUT BASED */}
                <div className="bg-white p-4 md:p-6 rounded-[25px] md:rounded-[30px] shadow-xl border border-black/5 flex flex-col md:flex-row items-center gap-4 md:gap-6 w-full max-w-[320px] md:max-w-xl md:w-auto mt-2 md:mt-0">
                    <span className="text-[var(--color-maroon)] font-bold text-[10px] md:text-sm uppercase tracking-widest">Filter by Price:</span>
                    <div className="flex items-center gap-3 md:gap-4">
                        <div className="relative">
                            <span className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs md:text-sm">₹</span>
                            <input
                                type="number"
                                placeholder="Min"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                className="w-20 md:w-28 pl-6 md:pl-8 pr-2 md:pr-4 py-2 md:py-3 bg-[var(--color-accent)]/50 border-none rounded-xl focus:ring-2 focus:ring-[var(--color-secondary)] outline-none font-bold text-xs md:text-sm"
                            />
                        </div>
                        <span className="text-gray-300 font-bold text-xs md:text-sm">to</span>
                        <div className="relative">
                            <span className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs md:text-sm">₹</span>
                            <input
                                type="number"
                                placeholder="Max"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                className="w-20 md:w-28 pl-6 md:pl-8 pr-2 md:pr-4 py-2 md:py-3 bg-[var(--color-accent)]/50 border-none rounded-xl focus:ring-2 focus:ring-[var(--color-secondary)] outline-none font-bold text-xs md:text-sm"
                            />
                        </div>
                    </div>
                    {(minPrice || maxPrice) && (
                        <button
                            onClick={() => { setMinPrice(''); setMaxPrice(''); }}
                            className="text-[10px] md:text-xs font-bold text-gray-400 hover:text-[var(--color-maroon)] transition-colors uppercase tracking-widest border-b border-gray-200"
                        >
                            Clear
                        </button>
                    )}
                </div>
            </section>

            {/* Laddu Grid */}
            <section ref={addToRefs} className="scroll-section px-6 md:px-24 relative z-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {filteredLaddus.map((laddu) => (
                        <LadduCard
                            key={laddu.id}
                            product={laddu}
                        />
                    ))}
                </div>

                {filteredLaddus.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-xl md:text-2xl text-gray-400 italic">No laddus found in this selection. Try adjusting your filters!</p>
                    </div>
                )}
            </section>

            {/* Quality Promise */}
            <section ref={addToRefs} className="scroll-section mt-16 md:mt-24 mx-6 md:mx-24 p-8 md:p-12 bg-white rounded-[40px] md:rounded-[50px] shadow-inner text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-[var(--color-accent)] rounded-full -mr-12 -mt-12 md:-mr-16 md:-mt-16 opacity-50"></div>
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-maroon)] mb-8 md:mb-12 relative z-10 font-[var(--font-heading)]">The SKS Quality Promise</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative z-10">
                    <div className="group text-center">
                        <div className="text-4xl md:text-5xl mb-4 transform group-hover:scale-110 transition-transform">🛡️</div>
                        <h4 className="font-bold mb-2 text-base md:text-lg">Hygienically Packed</h4>
                        <p className="text-xs md:text-sm text-gray-500 leading-relaxed italic">Double-sealed airtight containers to maintain freshness.</p>
                    </div>
                    <div className="group text-center">
                        <div className="text-4xl md:text-5xl mb-4 transform group-hover:scale-110 transition-transform">🚛</div>
                        <h4 className="font-bold mb-2 text-base md:text-lg">Pan-India Shipping</h4>
                        <p className="text-xs md:text-sm text-gray-500 leading-relaxed italic">Fast delivery to any corner within 3-5 business days.</p>
                    </div>
                    <div className="group text-center">
                        <div className="text-4xl md:text-5xl mb-4 transform group-hover:scale-110 transition-transform">📦</div>
                        <h4 className="font-bold mb-2 text-base md:text-lg">Bulk Orders</h4>
                        <p className="text-xs md:text-sm text-gray-500 leading-relaxed italic">Special customization for weddings and corporate events.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Laddus;
