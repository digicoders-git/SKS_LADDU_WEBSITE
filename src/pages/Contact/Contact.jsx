import { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Loader2 } from 'lucide-react';
import Footer from '../../components/layout/Footer';
import { createEnquiryApi } from '../../api/enquiry';
import { toast } from 'react-toastify';

const Contact = () => {
    const sectionRefs = useRef([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.name || !formData.phone || !formData.message) {
            toast.error("Please fill in required fields (Name, Phone, Message)");
            return;
        }

        setLoading(true);
        try {
            await createEnquiryApi(formData);
            toast.success("Thank you! Your message has been sent.");
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
        } catch (error) {
            console.error("Enquiry submission failed:", error);
            toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[var(--color-primary)] text-[var(--color-text)] font-[var(--font-body)] min-h-screen">
            {/* Contact Hero with Bubbles */}
            <section className="py-20 px-8 md:px-24 bg-[linear-gradient(0deg,rgba(255,212,0,0.1)_0%,transparent_70%)] text-center relative overflow-hidden mb-12">
                {/* Animated Background Bubbles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="contact-bubble contact-bubble-1"></div>
                    <div className="contact-bubble contact-bubble-2"></div>
                    <div className="contact-bubble contact-bubble-3"></div>
                    <div className="contact-bubble contact-bubble-4"></div>
                </div>

                <style dangerouslySetInnerHTML={{
                    __html: `
                        .contact-bubble {
                            position: absolute;
                            background: rgba(255, 212, 0, 0.15);
                            border-radius: 50%;
                            animation: float-contact-bubble 21s infinite ease-in-out;
                        }
                        .contact-bubble-1 {
                            width: 115px;
                            height: 115px;
                            left: 12%;
                            top: 22%;
                            animation-delay: 0s;
                        }
                        .contact-bubble-2 {
                            width: 145px;
                            height: 145px;
                            right: 18%;
                            top: 28%;
                            animation-delay: 3.5s;
                        }
                        .contact-bubble-3 {
                            width: 98px;
                            height: 98px;
                            left: 65%;
                            bottom: 22%;
                            animation-delay: 5s;
                        }
                        .contact-bubble-4 {
                            width: 125px;
                            height: 125px;
                            right: 55%;
                            bottom: 28%;
                            animation-delay: 1.5s;
                        }
                        @keyframes float-contact-bubble {
                            0%, 100% {
                                transform: translate(0, 0) scale(1);
                                opacity: 0.4;
                            }
                            50% {
                                transform: translate(28px, -38px) scale(1.09);
                                opacity: 0.6;
                            }
                        }
                    `
                }} />

                <h1 className="text-4xl md:text-6xl font-bold mb-6 relative z-10 text-[var(--color-secondary)]">Let's Talk Sweets</h1>
                <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto italic relative z-10 text-gray-300">
                    Have questions about our laddus or want to place a bulk order? We're here to help!
                </p>
            </section>

            <section className="py-24 px-8 md:px-24 -mt-16 z-20 relative">
                <div className="flex flex-col md:flex-row gap-12 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <div ref={addToRefs} className="scroll-section flex-1 bg-[var(--color-muted)] p-6 md:p-12 rounded-[40px] shadow-2xl border border-[var(--color-secondary)]/10">
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-secondary)] mb-6 md:mb-10">Get In Touch</h2>

                        <div className="space-y-6 md:space-y-8">
                            <div className="flex items-start gap-3 md:gap-6">
                                <div className="p-2 md:p-4 bg-[var(--color-primary)] rounded-2xl text-[var(--color-secondary)] flex-shrink-0 border border-[var(--color-secondary)]/20">
                                    <Mail size={18} className="md:w-6 md:h-6" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h4 className="font-bold text-[var(--color-secondary)] text-sm md:text-base">Email Us</h4>
                                    <a href="mailto:sksladdu8313@gmail.com" className="text-gray-400 hover:text-[var(--color-secondary)] transition-colors text-xs md:text-sm break-all">sksladdu8313@gmail.com</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 md:gap-6">
                                <div className="p-2 md:p-4 bg-[var(--color-primary)] rounded-2xl text-[var(--color-secondary)] flex-shrink-0 border border-[var(--color-secondary)]/20">
                                    <Phone size={18} className="md:w-6 md:h-6" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h4 className="font-bold text-[var(--color-secondary)] text-sm md:text-base">Call Us</h4>
                                    <div className="text-xs md:text-sm">
                                        <a href="tel:+916307736698" className="text-gray-400 hover:text-[var(--color-secondary)] transition-colors inline-block">+91 6307736698</a>
                                        <span className="text-gray-500">, </span>
                                        <a href="tel:+918467831372" className="text-gray-400 hover:text-[var(--color-secondary)] transition-colors inline-block">8467831372</a>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 md:gap-6">
                                <div className="p-2 md:p-4 bg-[var(--color-primary)] rounded-2xl text-[var(--color-secondary)] flex-shrink-0 border border-[var(--color-secondary)]/20">
                                    <MapPin size={18} className="md:w-6 md:h-6" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h4 className="font-bold text-[var(--color-secondary)] text-sm md:text-base">Visit Us</h4>
                                    <a
                                        href="https://www.google.com/maps/search/?api=1&query=Ahirawan,+Sandila,+Hardoi,+Uttar+Pradesh"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-[var(--color-secondary)] transition-colors underline decoration-dotted underline-offset-4 text-xs md:text-sm break-words"
                                    >
                                        Ahirawan, Sandila, Hardoi, Uttar Pradesh
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 md:mt-12 pt-8 md:pt-12 border-t border-[var(--color-secondary)]/10 italic text-gray-500 text-xs md:text-sm">
                            "Bringing the warmth of Sandila to your home since the 1920s."
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div ref={addToRefs} className="scroll-section flex-[1.5] bg-[var(--color-muted)] p-6 md:p-12 rounded-[40px] shadow-2xl border border-[var(--color-secondary)]/10">
                        <h2 className="text-3xl font-bold text-[var(--color-secondary)] mb-10">Send a Message</h2>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Full Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Your Name"
                                        className="w-full px-6 py-4 bg-[var(--color-primary)] text-white rounded-xl outline-none border border-[var(--color-secondary)]/20 focus:border-[var(--color-secondary)] transition-all placeholder-gray-600"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Your Email"
                                        className="w-full px-6 py-4 bg-[var(--color-primary)] text-white rounded-xl outline-none border border-[var(--color-secondary)]/20 focus:border-[var(--color-secondary)] transition-all placeholder-gray-600"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Phone Number *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Your Phone Number"
                                        className="w-full px-6 py-4 bg-[var(--color-primary)] text-white rounded-xl outline-none border border-[var(--color-secondary)]/20 focus:border-[var(--color-secondary)] transition-all placeholder-gray-600"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="Bulk Inquiry / Ordering"
                                        className="w-full px-6 py-4 bg-[var(--color-primary)] text-white rounded-xl outline-none border border-[var(--color-secondary)]/20 focus:border-[var(--color-secondary)] transition-all placeholder-gray-600"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Your Message *</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell us what you're looking for..."
                                    rows="5"
                                    className="w-full px-6 py-4 bg-[var(--color-primary)] text-white rounded-xl outline-none border border-[var(--color-secondary)]/20 focus:border-[var(--color-secondary)] transition-all resize-none placeholder-gray-600"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-5 bg-[var(--color-secondary)] text-[var(--color-primary)] rounded-xl font-bold text-lg shadow-[0_4px_15px_rgba(255,212,0,0.3)] hover:bg-[#e6c200] transition-all transform hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(255,212,0,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        Sending...
                                    </>
                                ) : "Send Message"}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Contact;
