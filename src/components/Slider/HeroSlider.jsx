import React, { useEffect, useState, memo, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { getActiveSlidersApi } from '../../api/slider';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const HeroSlider = memo(() => {
    const [sliders, setSliders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSliders = useCallback(async () => {
        try {
            const data = await getActiveSlidersApi();
            setSliders(data.sliders || []);
        } catch (error) {
            console.error("Failed to fetch sliders:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSliders();
    }, [fetchSliders]);

    if (loading) {
        return (
            <section className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[85vh] bg-gray-200 animate-pulse">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-[var(--color-secondary)] border-t-transparent rounded-full animate-spin"></div>
                </div>
            </section>
        );
    }

    if (sliders.length === 0) return null;

    return (
        <section className="relative w-full aspect-[1060/595] overflow-hidden">
            <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                effect="fade"
                speed={1000}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                loop={true}
                grabCursor={true}
                className="w-full h-full hero-swiper"
            >
                {sliders.map((slider) => (
                    <SwiperSlide key={slider._id}>
                        <div className="relative w-full h-full flex items-end justify-center pb-12 md:pb-24">
                            <div className="absolute inset-0 bg-[var(--color-primary)]">
                                <img
                                    src={slider.image?.url}
                                    alt={slider.title || 'SKS Laddu'}
                                    className="w-full h-full object-cover"
                                    loading="eager"
                                />
                            </div>

                            <div className="relative z-10 px-4 flex flex-col items-center">
                                <div className="flex flex-row justify-center items-center gap-3 md:gap-8 opacity-0 animate-slide-up" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
                                    <Link
                                        to="/laddus"
                                        className="inline-flex items-center justify-center px-6 py-3 md:px-10 md:py-5 bg-[var(--color-secondary)] text-[var(--color-primary)] rounded-full text-sm md:text-xl font-bold shadow-xl hover:scale-105 transition-transform"
                                    >
                                        Order Now
                                    </Link>
                                    <Link
                                        to="/about"
                                        className="inline-flex items-center justify-center px-6 py-3 md:px-10 md:py-5 bg-white/40 backdrop-blur-md border border-white/20 text-black rounded-full text-sm md:text-xl font-bold shadow-lg hover:scale-105 transition-transform"
                                    >
                                        Our Story
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <style>{`
                .hero-swiper .swiper-pagination {
                    bottom: 20px !important;
                }
                .hero-swiper .swiper-pagination-bullet {
                    background: white;
                    opacity: 0.6;
                    width: 7px;
                    height: 7px;
                    transition: all 0.3s ease;
                }
                .hero-swiper .swiper-pagination-bullet-active {
                    background: var(--color-secondary);
                    opacity: 1;
                    width: 20px;
                    border-radius: 4px;
                }
                @keyframes slide-up {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .animate-slide-up {
                    animation: slide-up 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                }
            `}</style>
        </section>
    );
});

HeroSlider.displayName = 'HeroSlider';

export default HeroSlider;
