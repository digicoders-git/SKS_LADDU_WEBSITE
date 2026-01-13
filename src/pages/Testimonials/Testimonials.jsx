import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import TestimonialCard from '../../components/cards/TestimonialCard';
import VideoReviewCard from '../../components/cards/VideoReviewCard';
import Footer from '../../components/layout/Footer';

const Testimonials = () => {
    const [activeTab, setActiveTab] = useState('text');
    const sectionRefs = useRef([]);

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

    const textReviews = [
        { quote: "Absolutely delicious! Brings back childhood memories of my visits to Sandila. The texture is just perfect.", name: "Anjali S.", color: '#D4AF37', initial: 'AS', location: 'Lucknow', rating: 5 },
        { quote: "The best laddus I've ever tasted. The kesar flavor is so authentic and the richness of ghee is unmatched.", name: "Rajesh K.", color: '#8B1D16', initial: 'RK', location: 'Delhi', rating: 5 },
        { quote: "Pure and authentic! You can tell it's made with real desi ghee. My parents were very impressed with the quality.", name: "Meera T.", color: '#D4AF37', initial: 'MT', location: 'Mumbai', rating: 4 },
        { quote: "Ordered these for my sister's wedding. Everyone loved them! The guest couldn't stop asking where they're from.", name: "Vikram P.", color: '#8B1D16', initial: 'VP', location: 'Bangalore', rating: 5 },
        { quote: "Quick delivery and fresh taste. High quality ingredients used for sure. Highly recommended for sweet lovers.", name: "Suman L.", color: '#D4AF37', initial: 'SL', location: 'Hyderabad', rating: 5 },
        { quote: "The packaging was beautiful and protected the sweets perfectly. Great attention to detail in everything.", name: "Neha G.", color: '#8B1D16', initial: 'NG', location: 'Pune', rating: 5 },
    ];

    const videoReviews = [
        { title: "The secret of Sandila revealed!", name: "Vikas Khanna", initial: "VK", color: "#8B1D16", location: "Chef, New York", rating: 5, thumbnailImg: "https://images.unsplash.com/photo-1541913076644-ee7343e86f87?q=80&w=800&auto=format&fit=crop" },
        { title: "Best Besan Laddu Review", name: "Priya S.", initial: "PS", color: "#D4AF37", location: "Food Vlogger", rating: 5, thumbnailImg: "https://images.unsplash.com/photo-1596791011555-b170e7ec97e6?q=80&w=800&auto=format&fit=crop" },
        { title: "Unboxing Genuine Sandila Laddus", name: "Amit T.", initial: "AT", color: "#8B1D16", location: "Tech Guru", rating: 4, thumbnailImg: "https://images.unsplash.com/photo-1589113331629-078bc2ecfe1b?q=80&w=800&auto=format&fit=crop" },
    ];

    return (
        <div className="bg-[var(--color-accent)] text-[var(--color-primary)] font-[var(--font-body)] min-h-screen overflow-x-hidden">
            {/* Testimonials Hero with Bubbles */}
            <section className="py-16 md:py-20 px-8 text-center bg-[var(--color-maroon)] text-white rounded-b-[40px] md:rounded-b-[50px] shadow-2xl relative overflow-hidden">
                {/* Animated Background Bubbles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="testimonial-bubble testimonial-bubble-1"></div>
                    <div className="testimonial-bubble testimonial-bubble-2"></div>
                    <div className="testimonial-bubble testimonial-bubble-3"></div>
                    <div className="testimonial-bubble testimonial-bubble-4"></div>
                </div>

                <style dangerouslySetInnerHTML={{
                    __html: `
                        .testimonial-bubble {
                            position: absolute;
                            background: rgba(212, 175, 55, 0.12);
                            border-radius: 50%;
                            animation: float-testimonial-bubble 23s infinite ease-in-out;
                        }
                        .testimonial-bubble-1 {
                            width: 118px;
                            height: 118px;
                            left: 14%;
                            top: 24%;
                            animation-delay: 0s;
                        }
                        .testimonial-bubble-2 {
                            width: 148px;
                            height: 148px;
                            right: 16%;
                            top: 18%;
                            animation-delay: 4.5s;
                        }
                        .testimonial-bubble-3 {
                            width: 102px;
                            height: 102px;
                            left: 68%;
                            bottom: 24%;
                            animation-delay: 2.5s;
                        }
                        .testimonial-bubble-4 {
                            width: 128px;
                            height: 128px;
                            right: 58%;
                            bottom: 26%;
                            animation-delay: 6.5s;
                        }
                        @keyframes float-testimonial-bubble {
                            0%, 100% {
                                transform: translate(0, 0) scale(1);
                                opacity: 0.4;
                            }
                            50% {
                                transform: translate(32px, -42px) scale(1.1);
                                opacity: 0.6;
                            }
                        }
                    `
                }} />

                <h1 className="text-3xl md:text-7xl font-bold mb-4 md:mb-6 tracking-tight relative z-10">Voices of Joy</h1>
                <p className="text-base md:text-2xl italic opacity-90 max-w-3xl mx-auto leading-relaxed px-4 relative z-10">
                    Over 10,000+ families across India trust us for their sweetest moments. Hear their stories.
                </p>
            </section>

            {/* Stats Counter Section */}
            <section ref={addToRefs} className="scroll-section flex justify-center -mt-8 md:-mt-10 mb-12 md:mb-16 relative z-10 px-6">
                <div className="bg-white px-6 md:px-16 py-6 md:py-8 rounded-[30px] md:rounded-[35px] shadow-2xl flex flex-wrap justify-around md:justify-between gap-6 md:gap-12 border border-[var(--color-secondary)]/10 backdrop-blur-md bg-white/95 w-full max-w-4xl">
                    <div className="text-center">
                        <h4 className="text-2xl md:text-4xl font-bold text-[var(--color-maroon)]">4.9/5</h4>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Avg Rating</p>
                    </div>
                    <div className="w-[1px] bg-gray-100 hidden md:block"></div>
                    <div className="text-center">
                        <h4 className="text-2xl md:text-4xl font-bold text-[var(--color-maroon)]">15k+</h4>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Orders Served</p>
                    </div>
                    <div className="w-[1px] bg-gray-100 hidden md:block"></div>
                    <div className="text-center">
                        <h4 className="text-2xl md:text-4xl font-bold text-[var(--color-maroon)]">98%</h4>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Loyal Users</p>
                    </div>
                </div>
            </section>

            {/* Tab Switcher */}
            <section className="flex justify-center mb-10 md:mb-12 px-8">
                <div className="bg-white/50 p-1.5 md:p-2 rounded-full backdrop-blur-sm border border-white flex gap-1 md:gap-2">
                    <button
                        onClick={() => setActiveTab('text')}
                        className={`px-6 md:px-10 py-3 md:py-4 rounded-full text-sm md:text-base font-bold transition-all duration-300 ${activeTab === 'text' ? 'bg-[var(--color-maroon)] text-white shadow-xl' : 'text-gray-500 hover:bg-white/80'}`}
                    >
                        Read Reviews
                    </button>
                    <button
                        onClick={() => setActiveTab('video')}
                        className={`px-6 md:px-10 py-3 md:py-4 rounded-full text-sm md:text-base font-bold transition-all duration-300 ${activeTab === 'video' ? 'bg-[var(--color-maroon)] text-white shadow-xl' : 'text-gray-500 hover:bg-white/80'}`}
                    >
                        Watch Videos
                    </button>
                </div>
            </section>

            {/* Review Content */}
            <section className="px-6 md:px-24">
                {activeTab === 'text' ? (
                    <div ref={addToRefs} className="scroll-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 transition-all">
                        {textReviews.map((item, i) => (
                            <TestimonialCard key={i} {...item} />
                        ))}
                    </div>
                ) : (
                    <div ref={addToRefs} className="scroll-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 transition-all">
                        {videoReviews.map((item, i) => (
                            <VideoReviewCard key={i} {...item} />
                        ))}
                        <div className="bg-white/30 border-2 border-dashed border-[var(--color-secondary)]/30 rounded-[35px] p-8 md:p-10 flex flex-col items-center justify-center text-center opacity-70 group hover:opacity-100 transition-opacity">
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center mb-4 text-xl md:text-2xl group-hover:scale-110 transition-transform shadow-sm">⭐</div>
                            <h4 className="font-bold text-[var(--color-maroon)] mb-2 text-base">Be the next star?</h4>
                            <p className="text-xs text-gray-500 italic">Share your experience on camera and get a flat 20% discount on your next order!</p>
                        </div>
                    </div>
                )}
            </section>

            {/* Action Section */}
            <div className="text-center mt-20 md:mt-24 px-6">
                <p className="text-gray-400 italic mb-6 text-base md:text-lg">Your feedback helps us stay authentic.</p>
                <button className="px-10 md:px-12 py-4 md:py-5 rounded-2xl bg-white border-2 border-[var(--color-maroon)] text-[var(--color-maroon)] font-bold text-lg md:text-xl hover:bg-[var(--color-maroon)] hover:text-white transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 w-full md:w-auto">
                    Write Your Review
                </button>
            </div>

            <div className="mt-16">
                <Footer />
            </div>
        </div>
    );
};

export default Testimonials;
