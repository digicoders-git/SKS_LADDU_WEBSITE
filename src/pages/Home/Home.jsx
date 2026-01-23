import React, { useEffect, useRef, useState, memo, useCallback, lazy, Suspense } from 'react';
import { Shield, Droplets, Leaf, Heart as HeartIcon } from 'lucide-react';
import { listProductsApi } from '../../api/product';
import { debounce, throttle } from '../../utils/performance';

// Lazy load all heavy components
const Footer = lazy(() => import('../../components/layout/Footer'));
const LadduCard = lazy(() => import('../../components/cards/LadduCard'));
const LazyVideoReviews = lazy(() => import('../../components/sections/LazyVideoReviews'));
const HeroSlider = lazy(() => import('../../components/Slider/HeroSlider'));
const BrandAdvertisement = lazy(() => import('../../components/sections/BrandAdvertisement'));
import Loader from '../../components/common/Loader';

// Import images directly
import big from '../../assets/images/big.png';
import kulhad from '../../assets/images/kulhad.png';
import moti from '../../assets/images/moti.png';
import founder from '../../assets/images/founder.PNG';
import coFounder from '../../assets/images/co-founder.JPG';

const SKSBrand = () => (
  <span className="font-[var(--font-accent)] text-[var(--color-secondary)] font-black tracking-tighter inline-flex items-center">
    SKS<span className="text-[10px] align-top ml-0.5 opacity-70">®</span>
  </span>
);

const Home = memo(() => {
  const sectionRefs = useRef([]);
  const ladduScrollRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await listProductsApi();
      // console.log('Home products data:', data);
      // Check if data has products array or if products are directly in data
      if (data.products) {
        setProducts(data.products);
      } else if (Array.isArray(data)) {
        setProducts(data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      throttle((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, 100),
      { threshold: 0.1, rootMargin: '50px 0px' }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observerRef.current.observe(ref);
    });

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!products.length) return;

    const ladduContainer = ladduScrollRef.current;
    if (!ladduContainer) return;

    let ladduInterval;
    let isLadduHovered = false;

    const startLadduScroll = throttle(() => {
      if (ladduInterval || isLadduHovered) return;
      ladduInterval = setInterval(() => {
        if (!ladduContainer || isLadduHovered) return;
        if (ladduContainer.scrollLeft >= ladduContainer.scrollWidth / 3) {
          ladduContainer.scrollLeft = 0;
        } else {
          ladduContainer.scrollLeft += 1.5;
        }
      }, 30);
    }, 100);

    const stopLadduScroll = () => {
      if (ladduInterval) {
        clearInterval(ladduInterval);
        ladduInterval = null;
      }
    };

    const handleMouseEnter = () => {
      isLadduHovered = true;
      stopLadduScroll();
    };

    const handleMouseLeave = () => {
      isLadduHovered = false;
      startLadduScroll();
    };

    setTimeout(startLadduScroll, 200);
    ladduContainer.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    ladduContainer.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      stopLadduScroll();
      ladduContainer.removeEventListener('mouseenter', handleMouseEnter);
      ladduContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [products]);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
      if (observerRef.current) {
        observerRef.current.observe(el);
      }
    }
  };

  return (
    <div className="bg-[var(--color-primary)] text-[var(--color-text)] font-[var(--font-body)] overflow-x-hidden mt-20 md:mt-24">

      {/* Hero Slider Section */}
      <Suspense fallback={
        <div className="h-[50vh] md:h-[80vh] bg-[var(--color-muted)] flex items-center justify-center">
          <Loader text="Preparing Sweetness..." />
        </div>
      }>
        <HeroSlider />
      </Suspense>

      {/* Our Special Laddus Section - Grid Layout First */}
      <section ref={addToRefs} className="scroll-section py-12 px-8 md:px-24 text-center bg-[var(--color-primary)] relative z-10 shadow-sm border-y border-[var(--color-secondary)]/10 overflow-hidden -mt-2" id="laddus">
        {/* Decorative Bubbles for This Section */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="home-bubble home-bubble-1"></div>
          <div className="home-bubble home-bubble-2"></div>
          <div className="home-bubble home-bubble-3"></div>
        </div>

        <style dangerouslySetInnerHTML={{
          __html: `
            .home-bubble {
              position: absolute;
              background: var(--color-secondary);
              border-radius: 50%;
              opacity: 0.1;
              animation: float-bubble 25s infinite ease-in-out;
            }
            .home-bubble-1 { width: 150px; height: 150px; left: 5%; top: 10%; animation-delay: 0s; }
            .home-bubble-2 { width: 250px; height: 250px; right: -5%; top: 40%; animation-delay: 4s; }
            .home-bubble-3 { width: 100px; height: 100px; left: 40%; bottom: 5%; animation-delay: 2s; }
            @keyframes float-bubble {
              0%, 100% { transform: translate(0, 0) scale(1); }
              50% { transform: translate(40px, -60px) scale(1.1); }
            }
          `
        }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-block px-4 py-1.5 bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] rounded-full text-[10px] font-bold uppercase tracking-[0.3em] mb-6 border border-[var(--color-secondary)]/20">
            SKS Laddu Collection
          </div>
          <h2 className="text-4xl md:text-7xl text-[var(--color-secondary)] mb-6 font-bold font-[var(--font-heading)] drop-shadow-sm">Our Special Laddus</h2>
          <p className="italic text-[var(--color-text-muted)] mb-16 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">Handcrafted with over 100 years of love and ancestral tradition, bringing the soul of Sandila to your home.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-14 px-2 sm:px-4">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-96 bg-gray-200 rounded-xl animate-pulse"></div>
              ))
            ) : (
              products.slice(0, 6).map((item) => (
                <div key={item._id} className="h-full transform hover:-translate-y-2 transition-transform duration-300">
                  <Suspense fallback={<div className="h-96 bg-gray-200 rounded-xl animate-pulse"></div>}>
                    <LadduCard
                      product={{
                        id: item._id,
                        name: item.name,
                        img: item.mainImage?.url || '/src/assets/images/besan-laddu.png',
                        price: item.price,
                        finalPrice: item.finalPrice,
                        discountPercent: item.discountPercent,
                        priceStr: `₹${item.finalPrice} / kg`,
                        description: item.description,
                        category: item.category?.name || 'Traditional'
                      }}
                    />
                  </Suspense>
                </div>
              ))
            )}
          </div>

          {!isLoading && products.length === 0 && (
            <div className="py-20 flex flex-col items-center">
              <p className="text-[var(--color-text-muted)] font-medium">No products available</p>
            </div>
          )}
        </div>
      </section>

      {/* Our Story Section - Massive Heritage Revamp placed AFTER Laddus */}
      <section ref={addToRefs} className="scroll-section bg-[var(--color-surface)] py-20 px-8 md:px-24 relative z-20 overflow-hidden mb-2" id="about">

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24 space-y-6">
            <div className="flex items-center justify-center gap-4 opacity-50">
              <div className="h-[1px] w-12 bg-[var(--color-secondary)]"></div>
              <h4 className="text-[var(--color-secondary)] font-bold uppercase tracking-[0.6em] text-xs lg:text-sm">The Soul of Sandila</h4>
              <div className="h-[1px] w-12 bg-[var(--color-secondary)]"></div>
            </div>
            <h2 className="text-5xl md:text-9xl font-black text-[var(--color-text)] font-[var(--font-heading)] leading-none tracking-tighter">
              Legacy of the <span className="text-[var(--color-secondary)] drop-shadow-[0_4px_10px_rgba(242,183,5,0.2)]">SKS</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-stretch">
            {/* Left Column: Multi-Image Grid with HD Quality Focus */}
            <div className="grid grid-cols-2 gap-6 h-full min-h-[600px]">
              <div className="col-span-2 relative group overflow-hidden rounded-[40px] shadow-2xl">
                <Suspense fallback={<div className="w-full h-full bg-gray-200 animate-pulse rounded-[40px]"></div>}>
                  <img src={big} alt="Sandila Railway Station Heritage" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 brightness-90 group-hover:brightness-100" loading="lazy" />
                </Suspense>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-8">
                  <p className="text-white font-bold text-xl drop-shadow-lg">A Nostalgic Railway Icon</p>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-[30px] shadow-xl border-2 border-white/10">
                <Suspense fallback={<div className="w-full h-full bg-gray-200 animate-pulse rounded-[30px]"></div>}>
                  <img src={kulhad} alt="Traditional Preparation" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                </Suspense>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="relative group overflow-hidden rounded-[30px] shadow-xl border-4 border-[var(--color-secondary)]/20">
                <Suspense fallback={<div className="w-full h-full bg-gray-200 animate-pulse rounded-[30px]"></div>}>
                  <img src={moti} alt="Sandila Laddoo Kulhad" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                </Suspense>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                  <span className="text-[var(--color-secondary)] font-bold tracking-widest uppercase">Pure Sandila</span>
                </div>
              </div>
            </div>

            {/* Right Column: Detailed Story Blocks */}
            <div className="flex flex-col justify-center gap-12">
              <div className="space-y-6">
                <p className="text-2xl text-[var(--color-text)] leading-relaxed italic font-medium border-l-8 border-[var(--color-secondary)] pl-8 bg-[var(--color-secondary)]/5 py-4 rounded-r-2xl">
                  "Sandila ke Laddoo are famous sweets from Sandila, UP, known for their unique 'sondha' (earthy) flavor traditionally sold in small earthen pots (SKS)."
                </p>
                <div className="space-y-4">
                  <p className="text-lg text-[var(--color-text-muted)] leading-relaxed opacity-90">
                    Sandila ke Laddoo are famous sweets from Sandila, UP, known for their simple ingredients (sugar, gram flour, water) and unique, moist, 'sondha' (earthy) flavor, traditionally sold in small earthen pots (SKS) at the railway station.
                  </p>
                  <p className="text-lg text-[var(--color-text-muted)] leading-relaxed opacity-90">
                    A nostalgic symbol of this transit town, enjoyed for generations by travelers, with legacy shops run by families for decades. Images show these laddus in rustic SKS or small pots, often with a sugar coating, a hallmark of this unique regional delicacy.
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                <div className="p-6 bg-white rounded-xl shadow-sm border border-[var(--color-secondary)]/10 hover:border-[var(--color-secondary)]/40 transition-colors group">
                  <h4 className="text-[var(--color-secondary)] font-black text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[var(--color-secondary)] rounded-full animate-ping"></span>
                    Origin
                  </h4>
                  <p className="text-[var(--color-text)] font-semibold leading-relaxed">
                    Sandila, a small town in the <span className="text-[var(--color-secondary)]">Hardoi district of UP</span>, gained fame for these laddoos, linked to royal kitchens and railway stops.
                  </p>
                </div>

                <div className="p-6 bg-white rounded-xl shadow-sm border border-[var(--color-secondary)]/10 hover:border-[var(--color-secondary)]/40 transition-colors">
                  <h4 className="text-[var(--color-secondary)] font-black text-xs uppercase tracking-widest mb-3">Pure Ingredients</h4>
                  <p className="text-[var(--color-text)] font-semibold leading-relaxed">
                    Made from basic gram flour (besan), sugar, and water, but the magic lies in their preparation and <span className="italic">earthy aroma</span>.
                  </p>
                </div>

                <div className="p-6 bg-white rounded-xl shadow-sm border border-[var(--color-secondary)]/10 hover:border-[var(--color-secondary)]/40 transition-colors">
                  <h4 className="text-[var(--color-secondary)] font-black text-xs uppercase tracking-widest mb-3">Kulhad Packaging</h4>
                  <p className="text-[var(--color-text)] font-semibold leading-relaxed">
                    Traditionally packed in clay pots and sold through train windows, making them an iconic transit snack.
                  </p>
                </div>

                <div className="p-6 bg-white rounded-xl shadow-sm border border-[var(--color-secondary)]/10 hover:border-[var(--color-secondary)]/40 transition-colors">
                  <h4 className="text-[var(--color-secondary)] font-black text-xs uppercase tracking-widest mb-3">Family Legacy</h4>
                  <p className="text-[var(--color-text)] font-semibold leading-relaxed">
                    Families have run the same shops for decades at <SKSBrand /> passing down recipes that remain a strong sentimental memory.
                  </p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-[40px] shadow-xl border border-[var(--color-secondary)]/10 relative overflow-hidden group">
                <div className="p-6 bg-gradient-to-br from-[var(--color-secondary)]/10 to-[var(--color-secondary)]/5 rounded-xl shadow-sm border-2 border-[var(--color-secondary)]/30 hover:border-[var(--color-secondary)] transition-colors group">
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-14 h-14 bg-[var(--color-secondary)] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Droplets className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-[var(--color-secondary)] mb-1">Motichoor Moist</h4>
                      <p className="text-sm text-[var(--color-text-muted)]">Soft, melt-in-mouth texture that defines authentic Sandila laddus</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Founder Section */}
      <section ref={addToRefs} className="scroll-section py-6 px-4 md:px-24 bg-[var(--color-primary)] relative z-10 shadow-sm overflow-hidden" id="founders">

        {/* Decorative Floating Elements */}
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-[var(--color-secondary)] rounded-full opacity-10 blur-[100px] animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[var(--color-secondary)] rounded-full opacity-10 blur-[120px]"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 md:mb-24">
            <div className="inline-block px-4 py-1.5 bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] rounded-full text-[10px] font-bold uppercase tracking-[0.3em] mb-4 border border-[var(--color-secondary)]/20">
              The Guiding Light
            </div>
            <h2 className="text-3xl md:text-8xl font-bold text-[var(--color-secondary)] font-[var(--font-heading)] tracking-tighter drop-shadow-md">The Faces Behind <SKSBrand /></h2>
            <p className="italic text-[var(--color-text-muted)] mt-6 text-base md:text-2xl max-w-2xl mx-auto opacity-80 leading-relaxed px-4">Preserving the legacy of Sandila for future generations with every handcrafted batch.</p>
          </div>

          <div className="space-y-16 lg:space-y-24">
            {/* Founder */}
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-16 bg-[var(--color-primary)] p-6 lg:p-12 rounded-[40px] shadow-xl border border-[var(--color-secondary)]/10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
              <div className="w-48 h-64 sm:w-56 sm:h-72 lg:w-80 lg:h-96 xl:w-96 xl:h-[28rem] rounded-[30px] overflow-hidden border-4 border-white shadow-lg group-hover:border-[var(--color-secondary)]/30 transition-all flex-shrink-0">
                <Suspense fallback={<div className="w-full h-full bg-gray-200 animate-pulse rounded-[30px]"></div>}>
                  <img src={founder} alt="Satish Kumar - Founder" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                </Suspense>
              </div>
              <div className="flex-1 text-center lg:text-left space-y-6">
                <h3 className="text-2xl lg:text-4xl xl:text-5xl font-bold text-[var(--color-secondary)] font-[var(--font-heading)] drop-shadow-sm">Satish Kumar</h3>
                <p className="text-[var(--color-primary)] bg-[var(--color-secondary)] inline-block px-6 py-2 rounded-full font-bold text-sm uppercase tracking-widest shadow-md">Founder & Master Craftsman</p>
                <p className="text-[var(--color-text-muted)] leading-relaxed text-base lg:text-lg xl:text-xl italic border-l-4 border-[var(--color-secondary)]/30 pl-6">
                  Born and raised in Sandila, Satish has been perfecting the art of laddu making for over 25 years.
                  His passion for preserving traditional recipes and bringing authentic flavors to modern homes drives our mission.
                  Every laddu crafted under his guidance carries the essence of generations of expertise.
                </p>
              </div>
            </div>

            {/* Co-Founder */}
            <div className="flex flex-col lg:flex-row-reverse items-center lg:items-start gap-8 lg:gap-16 bg-[var(--color-primary)] p-6 lg:p-12 rounded-[40px] shadow-xl border border-[var(--color-secondary)]/10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
              <div className="w-48 h-64 sm:w-56 sm:h-72 lg:w-80 lg:h-96 xl:w-96 xl:h-[28rem] rounded-[30px] overflow-hidden border-4 border-white shadow-lg group-hover:border-[var(--color-secondary)]/30 transition-all flex-shrink-0">
                <Suspense fallback={<div className="w-full h-full bg-gray-200 animate-pulse rounded-[30px]"></div>}>
                  <img src={coFounder} alt="Co-Founder" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                </Suspense>
              </div>
              <div className="flex-1 text-center lg:text-left space-y-6">
                <h3 className="text-2xl lg:text-4xl xl:text-5xl font-bold text-[var(--color-secondary)] font-[var(--font-heading)] drop-shadow-sm">Adarsh Bharti</h3>
                <p className="text-[var(--color-primary)] bg-[var(--color-secondary)] inline-block px-6 py-2 rounded-full font-bold text-sm uppercase tracking-widest shadow-md">Co-Founder & Quality Head</p>
                <p className="text-[var(--color-text-muted)] leading-relaxed text-base lg:text-lg xl:text-xl italic border-l-4 border-[var(--color-secondary)]/30 pl-6">
                  With a background in food technology, Priya ensures every batch meets our highest quality standards.
                  She oversees packaging, hygiene protocols, and customer satisfaction to maintain our legacy of excellence.
                  Her dedication to quality makes every SKS laddu a testament to perfection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={
        <div className="py-20 px-8 md:px-24 bg-white text-center border-y border-[var(--color-secondary)]/10">
          <div className="max-w-7xl mx-auto flex flex-col items-center">
            <Loader text="Loading Loved Stories..." />
          </div>
        </div>
      }>
        <LazyVideoReviews addToRefs={addToRefs} isHomePage={true} />
      </Suspense>

      {/* As Seen On - Media Coverage Section */}


      {/* Our Priorities Section */}
      <section ref={addToRefs} className="scroll-section py-10 px-8 md:px-24 bg-[var(--color-accent)]/10 relative z-10 shadow-sm mb-2" id="priorities">
        <h2 className="text-4xl text-[var(--color-secondary)] mb-16 font-bold text-center">Our Priorities</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="text-center p-6 bg-[var(--color-muted)] rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-[var(--color-secondary)] mb-2">Health First</h3>
            <p className="text-sm text-[var(--color-text)]">No artificial preservatives, colors, or flavors. Pure and natural ingredients only.</p>
          </div>
          <div className="text-center p-6 bg-[var(--color-muted)] rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Droplets className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-[var(--color-secondary)] mb-2">Hygiene Standards</h3>
            <p className="text-sm text-[var(--color-text)]">FSSAI certified kitchen with strict hygiene protocols and regular quality checks.</p>
          </div>
          <div className="text-center p-6 bg-[var(--color-muted)] rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-[var(--color-secondary)] mb-2">Fresh Daily</h3>
            <p className="text-sm text-[var(--color-text)]">Made fresh every day and delivered within 24-48 hours to ensure maximum freshness.</p>
          </div>
          <div className="text-center p-6 bg-[var(--color-muted)] rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <HeartIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-[var(--color-secondary)] mb-2">Made with Love</h3>
            <p className="text-sm text-[var(--color-text-muted)]">Every laddu is handcrafted with care, carrying forward our family's century-old tradition.</p>
          </div>
        </div>
      </section>

      <Suspense fallback={
        <div className="py-20 px-4 md:px-24 bg-zinc-950 flex flex-col items-center justify-center border-y border-[var(--color-secondary)]/20">
          <Loader text="Crafting Brand Legacy..." />
        </div>
      }>
        <BrandAdvertisement addToRefs={addToRefs} />
      </Suspense>



      <Suspense fallback={<div className="h-64 bg-[var(--color-surface)] animate-pulse border-t border-[var(--color-secondary)]/10"></div>}>
        <Footer />
      </Suspense>
    </div>
  );
});

Home.displayName = 'Home';

export default Home;