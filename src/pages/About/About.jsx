import React, { useEffect, useRef } from 'react';
import storyMaker from '../../assets/images/story-maker.png';

const About = () => {
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
    <div className="bg-[var(--color-accent)] text-[var(--color-primary)] font-[var(--font-body)] min-h-screen">

      {/* About Hero with Bubbles */}
      <section className="py-20 px-8 md:px-24 bg-[var(--color-maroon)] text-white text-center rounded-b-[50px] relative overflow-hidden">
        {/* Animated Background Bubbles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="about-bubble about-bubble-1"></div>
          <div className="about-bubble about-bubble-2"></div>
          <div className="about-bubble about-bubble-3"></div>
          <div className="about-bubble about-bubble-4"></div>
        </div>

        <style dangerouslySetInnerHTML={{
          __html: `
            .about-bubble {
              position: absolute;
              background: rgba(212, 175, 55, 0.12);
              border-radius: 50%;
              animation: float-about-bubble 22s infinite ease-in-out;
            }
            .about-bubble-1 {
              width: 120px;
              height: 120px;
              left: 10%;
              top: 20%;
              animation-delay: 0s;
            }
            .about-bubble-2 {
              width: 150px;
              height: 150px;
              right: 15%;
              top: 30%;
              animation-delay: 3s;
            }
            .about-bubble-3 {
              width: 100px;
              height: 100px;
              left: 70%;
              bottom: 20%;
              animation-delay: 6s;
            }
            .about-bubble-4 {
              width: 130px;
              height: 130px;
              right: 60%;
              bottom: 30%;
              animation-delay: 2s;
            }
            @keyframes float-about-bubble {
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

        <h1 className="text-4xl md:text-6xl font-bold mb-6 relative z-10">Our Legacy of Sweetness</h1>
        <p className="text-xl opacity-90 max-w-2xl mx-auto italic relative z-10">
          Crafting perfection for over a century, SKS Sandila Laddu brings the authentic taste of tradition to your modern lifestyle.
        </p>
      </section>

      {/* Our Journey */}
      <section ref={addToRefs} className="scroll-section py-24 px-8 md:px-24">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-[var(--color-maroon)] mb-6">A Journey Through Time</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Sandila, a hidden gem in Uttar Pradesh, has always been synonymous with its world-famous Laddus. At SKS, we carry a legacy that dates back over 100 years. What started as a passion for preserving traditional flavors has now blossomed into a brand that stands for quality, authenticity, and love.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Every single Laddu is handcrafted with precision, using recipes handed down through generations. From the selection of premium ingredients to the slow-roasting process, we ensure that every bite transports you back to the golden era of Nawabs and their grand feasts.
            </p>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            <img src={storyMaker} alt="Traditional Maker" className="w-full rounded-2xl shadow-lg border-4 border-white/50" />
            <div className="flex flex-col gap-4 justify-center">
              <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-[var(--color-secondary)]">
                <h4 className="font-bold text-[var(--color-maroon)] text-2xl">100+</h4>
                <p className="text-sm text-gray-600">Years of Heritage</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-[var(--color-secondary)]">
                <h4 className="font-bold text-[var(--color-maroon)] text-2xl">100%</h4>
                <p className="text-sm text-gray-600">Natural Ingredients</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section ref={addToRefs} className="scroll-section py-20 px-8 md:px-24 bg-white">
        <h2 className="text-3xl font-bold text-center text-[var(--color-maroon)] mb-16">Why SKS Sandila Laddu?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center p-8 rounded-3xl bg-[var(--color-accent)]/30 border border-[var(--color-secondary)]/20">
            <div className="text-4xl mb-6">🍯</div>
            <h3 className="text-xl font-bold mb-4">Pure Desi Ghee</h3>
            <p className="text-gray-600 italic">We use only the finest clarified butter, ensuring a rich aroma and melt-in-the-mouth texture.</p>
          </div>
          <div className="text-center p-8 rounded-3xl bg-[var(--color-accent)]/30 border border-[var(--color-secondary)]/20">
            <div className="text-4xl mb-6">👴</div>
            <h3 className="text-xl font-bold mb-4">Artisanal Craft</h3>
            <p className="text-gray-600 italic">No machines here. Every Laddu is hand-rolled by experienced artisans to maintain the perfect density.</p>
          </div>
          <div className="text-center p-8 rounded-3xl bg-[var(--color-accent)]/30 border border-[var(--color-secondary)]/20">
            <div className="text-4xl mb-6">🌿</div>
            <h3 className="text-xl font-bold mb-4">No Preservatives</h3>
            <p className="text-gray-600 italic">Freshly made, packed with care, and delivered to you without any artificial additives or chemicals.</p>
          </div>
        </div>
      </section>

      {/* Policies Section - BALANCED FOCUS */}
      <section ref={addToRefs} className="scroll-section py-20 px-8 md:px-24 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--color-maroon)] mb-4 inline-block relative after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-1 after:bg-[var(--color-secondary)]">
              Our Commitments
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Shipping Policy', icon: '🚚', link: '/shipping-policy', desc: 'Secure Pan-India delivery with real-time tracking.' },
              { title: 'Return Policy', icon: '🔄', link: '/return-policy', desc: 'Simple 24-hour claim window for damaged orders.' },
              { title: 'Terms of Service', icon: '📜', link: '/terms-of-service', desc: 'Defining our transparent rules of engagement.' }
            ].map((policy) => (
              <a
                key={policy.title}
                href={policy.link}
                className="bg-[var(--color-accent)]/20 p-8 rounded-[30px] shadow-sm hover:shadow-lg transition-all duration-300 text-center group border border-transparent hover:border-[var(--color-secondary)]/30 flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  {policy.icon}
                </div>
                <h4 className="font-bold text-[var(--color-maroon)] text-lg mb-2">{policy.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed italic">{policy.desc}</p>
                <span className="mt-4 text-[var(--color-secondary)] font-bold text-[10px] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">Discover More</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;