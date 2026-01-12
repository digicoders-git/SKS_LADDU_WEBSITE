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
    <div className="bg-[var(--color-accent)] text-[var(--color-primary)] font-[var(--font-body)]">

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between py-10 px-8 md:px-24 min-h-[50vh] bg-[radial-gradient(circle_at_70%_50%,rgba(212,175,55,0.1)_0%,transparent_70%)]" id="home">
        <div className="flex-1 max-w-xl text-center md:text-left z-10">
          <h1 className="text-3xl md:text-5xl text-[var(--color-maroon)] font-bold leading-tight mb-4">
            The Original Taste of Sandila, <br />Now at Your Home!
          </h1>
          <p className="text-base md:text-lg text-gray-700 mb-8 italic">
            Traditional Sandila Laddus Delivered to Your Doorstep
          </p>
          <Link
            to="/shop"
            className="hero-btn px-8 py-3 bg-[var(--color-maroon)] text-white no-underline rounded-md text-base font-semibold inline-block transition-all duration-300 shadow-[0_4px_15px_rgba(139,29,22,0.3)] hover:bg-[#a5231b] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(139,29,22,0.4)]"
            style={{ backgroundColor: '#8B1D16' }}
          >
            Order Now ›
          </Link>
        </div>
        <div className="flex-1 flex justify-center mt-8 md:mt-0 relative">
          <img
            src={heroLaddus}
            alt="Traditional Laddus"
            className="max-w-xs md:max-w-md w-full rounded-3xl drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)] animate-[float_6s_ease-in-out_infinite]"
            style={{ animation: 'float 6s ease-in-out infinite' }}
          />
          <style dangerouslySetInnerHTML={{
            __html: `
            @keyframes float {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-15px); }
            }
          ` }} />
        </div>
      </section>

      {/* Our Story Section */}
      <section ref={addToRefs} className="scroll-section bg-[#8B1D16] text-white py-24 px-8 md:px-24 relative rounded-t-[50px] md:rounded-t-[100px] mt-8 z-20 overflow-hidden" id="about">
        {/* Animated Background Bubbles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="story-bubble story-bubble-1"></div>
          <div className="story-bubble story-bubble-2"></div>
          <div className="story-bubble story-bubble-3"></div>
          <div className="story-bubble story-bubble-4"></div>
        </div>

        <style dangerouslySetInnerHTML={{
          __html: `
            .story-bubble {
              position: absolute;
              background: rgba(212, 175, 55, 0.12);
              border-radius: 50%;
              animation: float-story-bubble 23s infinite ease-in-out;
            }
            .story-bubble-1 {
              width: 120px;
              height: 120px;
              left: 5%;
              top: 10%;
              animation-delay: 0s;
            }
            .story-bubble-2 {
              width: 150px;
              height: 150px;
              right: 10%;
              top: 20%;
              animation-delay: 4.5s;
            }
            .story-bubble-3 {
              width: 100px;
              height: 100px;
              left: 15%;
              bottom: 15%;
              animation-delay: 2.5s;
            }
            .story-bubble-4 {
              width: 130px;
              height: 130px;
              right: 20%;
              bottom: 10%;
              animation-delay: 6.5s;
            }
            @keyframes float-story-bubble {
              0%, 100% {
                transform: translate(0, 0) scale(1);
                opacity: 0.4;
              }
              50% {
                transform: translate(30px, -40px) scale(1.1);
                opacity: 0.6;
              }
            }
          `
        }} />
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

      {/* Auto-Scrolling Video Reviews Section */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="relative w-full">
          <div className="flex w-max gap-8 animate-scroll hover:[animation-play-state:paused]">
            {/* Original Set */}
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div key={`v-${num}`} className="w-[280px] h-[400px] bg-gray-900 rounded-3xl overflow-hidden shadow-xl relative group cursor-pointer flex-shrink-0 border-4 border-[var(--color-maroon)]/10">
                {/* Video Placeholder (Simulated) */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black opacity-90 group-hover:opacity-100 transition-opacity"></div>

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 pointer-events-none border border-white/30">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                  </div>
                </div>

                {/* Simulated Video UI */}
                <div className="absolute top-4 right-4 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded">LIVE</div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-red-600"></div>
                  </div>
                </div>
              </div>
            ))}
            {/* Duplicate Set for Seamless Loop */}
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div key={`v-dup-${num}`} className="w-[280px] h-[400px] bg-gray-900 rounded-3xl overflow-hidden shadow-xl relative group cursor-pointer flex-shrink-0 border-4 border-[var(--color-maroon)]/10">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black opacity-90 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 pointer-events-none border border-white/30">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded">LIVE</div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-red-600"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-scroll {
              animation: scroll 30s linear infinite;
            }
          `
        }} />
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
    </div>
  );
};

export default Home;