import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import LadduCard from '../../components/cards/LadduCard';
import heroLaddus from '../../assets/images/hero-laddus.png';
import storyMaker from '../../assets/images/story-maker.png';
import besanLaddu from '../../assets/images/besan-laddu.png';
import kesarLaddu from '../../assets/images/kesar-laddu.png';
import nariyalLaddu from '../../assets/images/nariyal-laddu.png';

const Home = () => {
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

  return (
    <div className="bg-[var(--color-accent)] text-[var(--color-primary)] font-[var(--font-body)] overflow-x-hidden">

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between py-16 px-8 md:px-24 min-h-[80vh] bg-[radial-gradient(circle_at_70%_50%,rgba(212,175,55,0.1)_0%,transparent_70%)]" id="home">
        <div className="flex-1 max-w-xl text-center md:text-left z-10">
          <h1 className="text-4xl md:text-6xl text-[var(--color-maroon)] font-bold leading-tight mb-6">
            The Original Taste of Sandila, <br />Now at Your Home!
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-10 italic">
            Traditional Sandila Laddus Delivered to Your Doorstep
          </p>
          <Link
            to="/shop"
            className="hero-btn px-10 py-4 bg-[var(--color-maroon)] text-white no-underline rounded-md text-lg font-semibold inline-block transition-all duration-300 shadow-[0_4px_15px_rgba(139,29,22,0.3)] hover:bg-[#a5231b] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(139,29,22,0.4)]"
            style={{ backgroundColor: '#8B1D16' }}
          >
            Order Now ›
          </Link>
        </div>
        <div className="flex-1 flex justify-center mt-12 md:mt-0 relative">
          <img
            src={heroLaddus}
            alt="Traditional Laddus"
            className="max-w-full rounded-3xl drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)] animate-[float_6s_ease-in-out_infinite]"
            style={{ animation: 'float 6s ease-in-out infinite' }}
          />
          <style dangerouslySetInnerHTML={{
            __html: `
            @keyframes float {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-20px); }
            }
          ` }} />
        </div>
      </section>

      {/* Our Story Section */}
      <section ref={addToRefs} className="scroll-section bg-[#8B1D16] text-white py-24 px-8 md:px-24 relative rounded-t-[50px] md:rounded-t-[100px] -mt-12 z-20" id="about">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1">
            <h2 className="text-4xl text-[var(--color-secondary)] mb-8 flex items-center before:content-['::'] before:mr-3 before:opacity-50">
              Our Story
            </h2>
            <ul className="list-none p-0">
              <li className="mb-6 text-lg flex items-start leading-relaxed leading-snug"><span className="mr-4 text-2xl">👨</span> I am Satish Kumar, a resident of Sandila. I have been enjoying Sandila's Laddus since childhood.</li>
              <li className="mb-6 text-lg flex items-start leading-relaxed leading-snug"><span className="mr-4 text-2xl">🍯</span> Our Laddu tradition is more than 100 years old!</li>
              <li className="mb-6 text-lg flex items-start leading-relaxed leading-snug"><span className="mr-4 text-2xl">🏰</span> "The feast of the Nawabs of Lucknow is incomplete without Sandila's authentic Laddus!"</li>
              <li className="mb-6 text-lg flex items-start leading-relaxed leading-snug"><span className="mr-4 text-2xl">🎬</span> They have even been celebrated in several Bollywood movies.</li>
              <li className="mb-6 text-lg flex items-start leading-relaxed leading-snug"><span className="mr-4 text-2xl">🚚</span> Today, carrying this legacy forward, we bring you the original Laddus of Sandila, now available online! 🌍</li>
            </ul>
          </div>
          <div className="flex-1 w-full max-w-md">
            <div className="border-[8px] border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <img src={storyMaker} alt="Making Laddus" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Special Laddus Section */}
      <section ref={addToRefs} className="scroll-section py-24 px-8 md:px-24 text-center bg-[var(--color-accent)]" id="laddus">
        <h2 className="text-4xl text-[var(--color-maroon)] mb-2 font-bold">Our Special Laddus</h2>
        <p className="italic text-gray-500 mb-16">Pure and Delicious</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { id: 101, name: 'Classic Besan Laddu', img: besanLaddu, price: 480, priceStr: '₹480 / kg', description: 'Hand-roasted gram flour blended with pure desi ghee.', category: 'Classic' },
            { id: 102, name: 'Kesar Dry Fruit Laddu', img: kesarLaddu, price: 750, priceStr: '₹750 / kg', description: 'Rich saffron infusion with premium dry fruits.', category: 'Dry Fruit' },
            { id: 103, name: 'Nariyal Laddu', img: nariyalLaddu, price: 380, priceStr: '₹380 / kg', description: 'Soft coconut crumbles with a hint of cardamom.', category: 'Exotic' }
          ].map((item, i) => (
            <LadduCard
              key={item.name}
              product={item}
            />
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={addToRefs} className="scroll-section py-24 px-8 md:px-24 bg-gradient-to-b from-white to-[var(--color-accent)] text-center" id="testimonials">
        <h2 className="text-4xl text-[var(--color-maroon)] mb-16 font-bold">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { quote: "Absolutely delicious! Brings back childhood memories.", name: "Anjali S.", color: '#D4AF37', initial: 'AS' },
            { quote: "The best laddus I've ever tasted. Will order again!", name: "Rajesh K.", color: '#8B1D16', initial: 'RK' },
            { quote: "Pure and authentic! Loved every bite!", name: "Meera T.", color: '#D4AF37', initial: 'MT' }
          ].map((item, i) => (
            <div key={i} className="bg-white p-10 rounded-[20px] shadow-[0_5px_20px_rgba(0,0,0,0.03)] border border-black/5 text-center flex flex-col items-center">
              <p className="italic text-lg mb-8 text-gray-700 leading-relaxed">"{item.quote}"</p>
              <div className="flex flex-col items-center gap-3">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl border-[3px] border-[var(--color-secondary)] shadow-md"
                  style={{ backgroundColor: item.color }}
                >
                  {item.initial}
                </div>
                <span className="font-bold text-[var(--color-maroon)]" style={{ color: '#8B1D16' }}>{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-[#8B1D16] text-white py-16 px-8 md:px-24 text-center" id="contact">
        <h2 className="text-3xl text-[var(--color-secondary)] mb-10 font-bold">Get In Touch</h2>
        <div className="flex justify-center gap-8 md:gap-12 mb-12 flex-wrap text-lg">
          <a href="mailto:sksladdu8313@gmail.com" className="opacity-90 flex items-center gap-2 hover:text-[var(--color-secondary)] transition-colors no-underline text-white">
            <span>📧</span> sksladdu8313@gmail.com
          </a>
          <a href="tel:+916307736698" className="opacity-90 flex items-center gap-2 hover:text-[var(--color-secondary)] transition-colors no-underline text-white">
            <span>📞</span> +91 6307736698
          </a>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Ahirawan,+Sandila,+Hardoi,+Uttar+Pradesh"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-90 flex items-center gap-2 hover:text-[var(--color-secondary)] transition-colors no-underline text-white underline decoration-dotted underline-offset-4"
          >
            <span>📍</span> Ahirawan, Sandila, Uttar Pradesh
          </a>
        </div>
        <div className="flex justify-center gap-8 mb-12">
          {['Facebook', 'Instagram', 'WhatsApp'].map(social => (
            <span key={social} className="cursor-pointer transition-colors duration-300 hover:text-[var(--color-secondary)] font-semibold">{social}</span>
          ))}
        </div>
        <div className="flex justify-center gap-8 mb-12 flex-wrap">
          <a href="/shipping-policy" className="hover:text-[var(--color-secondary)] transition-colors">Shipping Policy</a>
          <a href="/return-policy" className="hover:text-[var(--color-secondary)] transition-colors">Return Policy</a>
          <a href="/terms-of-service" className="hover:text-[var(--color-secondary)] transition-colors">Terms of Service</a>
        </div>
        <div className="border-t border-white/10 pt-8 text-sm opacity-60">
          © 2024 SKS Sandila Laddu. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;